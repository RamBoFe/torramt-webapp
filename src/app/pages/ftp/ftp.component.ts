import { Component, OnInit } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { ModalFtpToNasComponent } from '../../components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import { ModalYesNoComponent } from '../../components/modals/modal-yes-no/modal-yes-no.component';
import { FtpService } from '../../services/api/ftp/ftp.service';
import { NasService } from '../../services/api/nas/nas.service';

@Component({
  selector: 'app-ftp',
  templateUrl: './ftp.component.html',
  styleUrls: ['./ftp.component.scss']
})
export class FtpComponent implements OnInit {
  files: Array<any>;
  breadcrumbs: Array<string> = [];
  modalRef: MDBModalRef;

  constructor(private ftpService: FtpService,
              private nasService: NasService,
              private modalService: MDBModalService) { }

  async ngOnInit(): Promise<any> {
    this.files = await this.ftpService.getList();
  }

  async move(folder = ''): Promise<any> {
    const index = this.breadcrumbs.indexOf(folder);

    if (index === -1 && folder !== '') {
      this.breadcrumbs.push(folder);
    } else {
      this.breadcrumbs
        .splice(index + 1, this.breadcrumbs.length - index + 1);
    }

    this.files = await this.ftpService.getList(`/${this.breadcrumbs.join('/')}`);
  }

  async transfertToNas(folder: string,
                       destination: string,
                       createSubFolder: string,
                       type: string): Promise<any> {
    const path = this.breadcrumbs.join('/');
    await this.nasService.transferToNas(
      `/${path}/${folder}`,
      destination,
      createSubFolder,
      type);
  }

  async delete(path, type): Promise<any> {
    await this.ftpService.delete(path, type);
  }

  openModalTransfertToNas(path: string, type: string): void {
    this.modalRef = this.modalService.show(ModalFtpToNasComponent);
    this.modalRef.content.transfert.subscribe(params => {
      this.transfertToNas(path, params.destination, params.subFolder, type);
      this.modalRef.hide();
    });
  }

  openModalConfirmDel(fileName: string, fileType: string): void {
    this.modalRef = this.modalService.show(ModalYesNoComponent, {
      data: {
        title: fileType === 'd' ?
          `Suppression du dossier "${fileName}" ?` :
          `Suppression du fichier "${fileName}" ?`,
        body: fileType === 'd' ?
          'Voulez-vous vraiment supprimer ce dossier ? (Les sous-dossiers seront également supprimés) ?' :
          'Voulez-vous vraiment supprimer ce fichier ?',
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
        this.delete(`${this.breadcrumbs.join('/')}/${fileName}`, fileType);
      }
    });
  }
}
