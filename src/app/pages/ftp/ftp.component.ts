// import { Component, OnInit } from '@angular/core';
// import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
// import { ToastrService } from 'ngx-toastr';
// import { ModalFtpToNasComponent } from '../../components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
// import { ModalYesNoComponent } from '../../components/modals/modal-yes-no/modal-yes-no.component';
// import { FtpService } from '../../services/api/ftp/ftp.service';
// import { NasService } from '../../services/api/nas/nas.service';
//
// @Component({
//   selector: 'app-ftp',
//   templateUrl: './ftp.component.html',
//   styleUrls: ['./ftp.component.scss']
// })
// export class FtpComponent implements OnInit {
//   files: Array<any>;
//   breadcrumbs: Array<string> = [];
//   modalRef: MDBModalRef;
//
//   constructor(public ftpService: FtpService,
//               private nasService: NasService,
//               private modalService: MDBModalService,
//               private toastr: ToastrService) { }
//
//   async ngOnInit(): Promise<void> {
//     setTimeout(async () => this.files = await this.ftpService.getList());
//   }
//
//   async move(folder = ''): Promise<void> {
//     const index = this.breadcrumbs.indexOf(folder);
//
//     if (index === -1 && folder !== '') {
//       this.breadcrumbs.push(folder);
//     } else {
//       this.breadcrumbs
//         .splice(index + 1, this.breadcrumbs.length - index + 1);
//     }
//
//     this.files = await this.ftpService.getList(`/${this.breadcrumbs.join('/')}`);
//   }
//
//   async delete(path, type): Promise<void> {
//     await this.ftpService.delete(path, type);
//     this.toastr.success('Le torrent a bien été supprimé du ftp.', 'Suppression d\'un torrent du ftp');
//   }
//
//   openModalTransfertToNas(folder: string, type: string): void {
//     this.modalRef = this.modalService.show(ModalFtpToNasComponent, { data: { torrentName: folder } });
//     this.modalRef.content.transfert.subscribe(async params => {
//       this.modalRef.hide();
//       const path = this.breadcrumbs.join('/');
//       await this.nasService.transferToNas(`/${path}/${folder}`, params.destination, params.subFolder, type);
//       this.toastr.success('Le transfert du torrent vers le Nas a débuté.', 'Transfert du torrent');
//     });
//   }
//
//   openModalConfirmDel(fileName: string, fileType: string): void {
//     this.modalRef = this.modalService.show(ModalYesNoComponent, {
//       data: {
//         title: fileType === 'd'
//           ? `Suppression du dossier "${fileName}" ?`
//           : `Suppression du fichier "${fileName}" ?`,
//         body: fileType === 'd'
//           ? 'Voulez-vous vraiment supprimer ce dossier ? (Les sous-dossiers seront également supprimés) ?'
//           : 'Voulez-vous vraiment supprimer ce fichier ?',
//         btnYes: {
//           label: 'Supprimer',
//           color: 'danger',
//           outline: false,
//           icon: 'trash-alt'
//         },
//         btnNo: {
//           label: 'Annuler',
//           color: 'danger',
//           outline: true
//         }
//       }
//     });
//     this.modalRef.content.response.subscribe(response => {
//       if (response) {
//         this.delete(`${this.breadcrumbs.join('/')}/${fileName}`, fileType);
//       }
//     });
//   }
// }
