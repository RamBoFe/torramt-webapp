import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FtpService} from '../../services/api/ftp/ftp.service';
import {TAG_SEEDBOX} from '../../services/api/nas/nas.service';
import {TransmissionService} from '../../services/api/torrents/management/transmission';
import {SeedboxTorrent} from '../../models/seedbox-torrent.models';
import {MatDialog} from '@angular/material/dialog';
import {DialogFtpToNasComponent} from '../../components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import {ToastrService} from 'ngx-toastr';
import {DialogYesNoComponent} from '../../components/modals/modal-yes-no/modal-yes-no.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-seedbox',
  templateUrl: './seedbox.component.html',
  styleUrls: ['./seedbox.component.scss'],
})
export class SeedboxComponent implements OnInit, OnDestroy {
  torrents: SeedboxTorrent[] = [];
  ftpSize: number = undefined;
  // totalTorrents: number = undefined;
  //   private interval: Observable<number> = interval(2500);
  private subscriptions: Subscription[] = [];
  //
  constructor(
    public transmissionService: TransmissionService,
    public ftp: FtpService,
    private readonly dialogService: MatDialog,
    private toastr: ToastrService
  ) {}

  async ngOnInit(): Promise<void> {
    //     setTimeout(async () => {
    this.torrents = await this.getTorrents();
    // this.totalTorrents = this.torrents.length;
    this.ftpSize = await this.ftp.getSize(`/${TAG_SEEDBOX}`);
    //       this.subscriptionInterval = this.interval.subscribe(async () => this.torrents = await this.getTorrents());
    //     });
  }
  //
  async getTorrents(): Promise<SeedboxTorrent[]> {
    return await this.transmissionService.getTorrents();
  }

  async togglePlayPause(status: number, hash: string): Promise<void> {
    if (status) {
      await this.transmissionService.stop(hash);
    } else {
      await this.transmissionService.start(hash);
    }
  }

  async remove(hash: string): Promise<void> {
    await this.transmissionService.remove(hash);
    this.toastr.success(
      'Le torrent a bien été supprimé de la seedbox.',
      "Suppression d'un torrent de la seedbox"
    );
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
            this.toastr.success(
              'Le transfert du torrent vers le Nas a débuté.',
              'Transfert du torrent'
            );
          } else {
            this.toastr.error(
              'Le transfert du torrent vers le Nas a échoué.',
              'Erreur du transfert du torrent'
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
}
