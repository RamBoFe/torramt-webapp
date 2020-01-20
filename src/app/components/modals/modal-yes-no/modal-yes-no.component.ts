import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-yes-no',
  templateUrl: './modal-yes-no.component.html',
  styleUrls: ['./modal-yes-no.component.scss']
})

export class ModalYesNoComponent {
  response: Subject<any> = new Subject();
  title: string;
  body: string;
  btnYes = {
    label: 'Oui',
    color: 'primary',
    outline: false,
    icon: undefined
  };
  btnNo = {
    label: 'Non',
    color: 'primary',
    outline: true,
    icon: undefined
  };

  constructor(private modalRef: MDBModalRef) {}

  sendResponse(response: boolean): void {
    this.response.next(response);
    this.hideModal();
  }

  hideModal(): void {
    this.modalRef.hide();
  }
}
