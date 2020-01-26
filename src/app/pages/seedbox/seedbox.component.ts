import { Component, OnDestroy, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ToastrService } from 'ngx-toastr';
import { interval, Observable, Subscription } from 'rxjs';
import { ModalFtpToNasComponent } from '../../components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import { ModalYesNoComponent } from '../../components/modals/modal-yes-no/modal-yes-no.component';
import { FtpService } from '../../services/api/ftp/ftp.service';
import { NasService, TAG_SEEDBOX } from '../../services/api/nas/nas.service';
import { TransmissionService } from '../../services/api/torrents/management/transmission';

@Component({
  selector: 'app-seedbox',
  templateUrl: './seedbox.component.html',
  styleUrls: ['./seedbox.component.scss']
})

export class SeedboxComponent implements OnInit, OnDestroy {

  torrents: Array<any>;
  ftpSizeTorrents: Number = 0;
  totalTorrents: Number = 0;
  private modalRef: MDBModalRef;

  private interval: Observable<number> = interval(2500);
  private subscriptionInterval: Subscription;

  constructor(
    private transmission: TransmissionService,
    private ftp: FtpService,
    private nasService: NasService,
    private modalService: MDBModalService,
    private toastr: ToastrService
    ) { }

  async ngOnInit(): Promise<any> {
    this.torrents = await this.getTorrents();
    this.totalTorrents = this.torrents.length;
    // this.subscriptionInterval = this.interval.subscribe(async () => this.torrents = await this.getTorrents());
    this.ftpSizeTorrents = await this.ftp.getSize(`/${TAG_SEEDBOX}`);
  }

  async getTorrents(): Promise<any> {
    return this.transmission.getTorrents();
  }

  async togglePlayPause(status: number, hash: string): Promise<any> {
    if (status) {
      await this.transmission.stop(hash);
    } else {
      await this.transmission.start(hash);
    }
  }

  async remove(hash: string): Promise<any> {
    await this.transmission.remove(hash);
    this.toastr.success('Le torrent a bien été supprimé de la seedbox.', 'Suppression d\'un torrent de la seedbox');
  }

  openModalTransfertToNas(path: string, type: string): void {
    this.modalRef = this.modalService.show(ModalFtpToNasComponent);
    this.modalRef.content.transfert.subscribe(async params => {
      this.modalRef.hide();
      await this.nasService.transferToNas(`/${TAG_SEEDBOX}/${path}`, params.destination, params.subFolder, type);
      this.toastr.success('Le transfert du torrent vers le Nas a débuté.', 'Transfert du torrent');
    });
  }

  openModalConfirmDel(hash: string, name: string): void {
    this.modalRef = this.modalService.show(ModalYesNoComponent, {
      data: {
        title: `Suppression du torrent "${name}" ?`,
        body: 'Voulez-vous vraiment supprimer ce torrent ? (Les fichiers du ftp seront également supprimés) ?',
        btnYes: {
          label: 'Supprimer',
          color: 'danger',
          outline: false,
          icon: 'trash-alt'
        },
        btnNo: {
          label: 'Annuler',
          color: 'danger',
          outline: true
        }
      }
    });
    this.modalRef.content.response.subscribe(response => {
      if (response) {
        this.remove(hash);
      }
    });
  }

  ngOnDestroy(): void {
    // this.subscriptionInterval.unsubscribe();
  }
}
