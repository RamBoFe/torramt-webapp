import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { interval } from 'rxjs';
import { ModalYesNoComponent } from '../../components/modals/modal-yes-no/modal-yes-no.component';
import { FtpService } from '../../services/api/ftp/ftp.service';
import { TransmissionService } from '../../services/api/torrents/management/transmission';

@Component({
  selector: 'app-seedbox',
  templateUrl: './seedbox.component.html',
  styleUrls: ['./seedbox.component.scss']
})
export class SeedboxComponent implements OnInit {

  torrents: Array<any>;
  totalSize: Number = 0;
  totalTorrents: Number = 0;
  modalRef: MDBModalRef;

  constructor(
    private transmission: TransmissionService,
    private ftp: FtpService,
    private modalService: MDBModalService
    ) { }

  async ngOnInit(): Promise<any> {
    this.torrents = await this.getTorrents();
    this.totalTorrents = this.torrents.length;
    this.totalSize = await this.ftp.getSize('/RamBoF');

    interval(2500)
      .subscribe(async () => this.torrents = await this.getTorrents());
  }

  async getTorrents(): Promise<any> {
    const torrents = await this.transmission.getTorrents();

    return torrents;
  }

  async togglePlayPause(status: number, hash: string): Promise<any> {
    if (status) {
      this.transmission.stop(hash);
    } else {
      this.transmission.start(hash);
    }
  }

  async remove(hash: string): Promise<any> {
    this.transmission.remove(hash);
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

}
