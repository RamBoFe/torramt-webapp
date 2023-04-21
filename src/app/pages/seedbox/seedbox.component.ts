import {Component, OnDestroy, OnInit} from '@angular/core';
import {FtpService} from '../../services/api/ftp/ftp.service';
import {TAG_SEEDBOX} from '../../services/api/nas/nas.service';
import {TransmissionService} from '../../services/api/torrents/management/transmission';
import {SeedboxTorrent} from '../../models/seedbox-torrent.models';
import {MatDialog} from '@angular/material/dialog';
import {DialogFtpToNasComponent} from '../../components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import {DialogYesNoComponent} from '../../components/modals/modal-yes-no/modal-yes-no.component';
import {interval, Observable, Subscription} from 'rxjs';
import {TRANSMISSION_STATUS} from '../../enums/transmission-status.enum';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-seedbox',
  templateUrl: './seedbox.component.html',
  styleUrls: ['./seedbox.component.scss'],
})
export class SeedboxComponent implements OnInit, OnDestroy {
  torrents: SeedboxTorrent[] = [];
  torrentsMarkedToFollow: SeedboxTorrent[] = [];
  ftpSize!: number;
  private interval: Observable<number> = interval(2500);
  private subscriptions: Subscription[] = [];
  TRANSMISSION_STATUS = TRANSMISSION_STATUS;
  autoUpdate = false;

  constructor(
    readonly transmissionService: TransmissionService,
    readonly ftp: FtpService,
    private readonly dialogService: MatDialog,
    private readonly snackBarService: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.torrents = await this.transmissionService.list();
    await this.followToUpdate();
    this.ftpSize = await this.ftp.getSize(`/${TAG_SEEDBOX}`);
  }

  async followToUpdate(): Promise<void> {
    this.torrents.forEach(torrent => {
      if (torrent.status === TRANSMISSION_STATUS.DOWNLOAD) {
        torrent.isFollowed = true;

        const isAlreadyMarkedToFollow = this.torrentsMarkedToFollow.find(
          torrentMarked => torrentMarked.hashString === torrent.hashString
        );

        if (!isAlreadyMarkedToFollow) {
          this.torrentsMarkedToFollow.push(torrent);
        }
      }
    });

    if (this.torrentsMarkedToFollow.length) {
      const subscription = this.interval.subscribe(async () => {
        await this.fetchTorrentsFollowed(this.torrentsMarkedToFollow);
        if (!this.torrentsMarkedToFollow.length) {
          this.ngOnDestroy();
        }
      });
      this.subscriptions.push(subscription);
    } else {
      this.ngOnDestroy();
    }
  }

  async togglePlayPause(status: number, hash: string): Promise<void> {
    if (status) {
      await this.transmissionService.stop(hash);
    } else {
      await this.transmissionService.start(hash);
    }

    if (!this.autoUpdate) {
      const torrent = this.torrents.find(
        torrent => torrent.hashString === hash
      );
      await this.fetchTorrentsFollowed([torrent]);
      await this.followToUpdate();
    }
  }

  async fetchTorrentsFollowed(torrents: SeedboxTorrent[]): Promise<void> {
    const torrentsFetched = await this.transmissionService.get(
      torrents.map(torrent => torrent.hashString)
    );

    torrentsFetched.forEach(torrent => {
      const index = this.torrents.findIndex(item => item.id === torrent.id);
      this.torrents.splice(index, 1, torrent);
      if (torrent.status !== TRANSMISSION_STATUS.DOWNLOAD) {
        this.torrentsMarkedToFollow.splice(
          this.torrentsMarkedToFollow.findIndex(item => item.id === torrent.id),
          1
        );
      }
    });
  }

  async remove(hash: string): Promise<void> {
    try {
      await this.transmissionService.remove(hash);
      this.snackBarService.open(
        'Le torrent a bien été supprimé de la seedbox.',
        'FERMER',
        {duration: 5000}
      );

      if (!this.autoUpdate) {
        this.torrents = this.torrents.filter(
          torrent => torrent.hashString !== hash
        );
        this.torrentsMarkedToFollow = this.torrentsMarkedToFollow.filter(
          torrent => torrent.hashString !== hash
        );
      }
    } catch (e) {
      this.snackBarService.open(
        'Impossible de supprimer le torrent de la seedbox.',
        'FERMER',
        {duration: 5000}
      );
    }
  }

  openDialogTransfertToNas(path: string, type: string): void {
    const dialogRef = this.dialogService.open(DialogFtpToNasComponent, {
      data: {torrentName: path, type},
      hasBackdrop: true,
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(value => {
        if (value !== '' && value !== undefined) {
          if (value) {
            this.snackBarService.open(
              'Le transfert du torrent vers le Nas a débuté.',
              'FERMER',
              {duration: 5000}
            );
          } else {
            this.snackBarService.open(
              'Le transfert du torrent vers le Nas a échoué.',
              'FERMER',
              {duration: 5000}
            );
          }
        }
      })
    );
  }

  openDialogDelete(hash: string, name: string): void {
    const dialogRef = this.dialogService.open(DialogYesNoComponent, {
      data: {
        title: `Suppression du torrent "${name}" ?`,
        body: 'Voulez-vous vraiment supprimer ce torrent ? (Les fichiers du ftp seront également supprimés) ?',
        btnYes: {
          label: 'Supprimer',
          color: 'warn',
          icon: 'delete',
        },
        btnNo: {
          label: 'Annuler',
          color: 'warn',
        },
      },
    });

    this.subscriptions.push(
      dialogRef.afterClosed().subscribe(async response => {
        if (response) {
          await this.remove(hash);
        }
      })
    );
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  async onToggleChanged(): Promise<void> {
    this.autoUpdate = !this.autoUpdate;
    this.ngOnDestroy();
    if (this.autoUpdate) {
      this.torrentsMarkedToFollow = [];
      this.subscriptions.push(
        this.interval.subscribe(async () => {
          this.torrents = await this.transmissionService.list();
        })
      );
    } else {
      await this.followToUpdate();
    }
  }
}
