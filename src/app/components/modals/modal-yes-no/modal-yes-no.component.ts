import { Component } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../services/loader.service';
import { TransmissionService } from '../../../services/api/torrents/management/transmission';

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

  api: any;

  constructor(
    private readonly modalRef: MDBModalRef,
    readonly transmissionService: TransmissionService
  ) {}

  sendResponse(response: boolean): void {
    this.response.next(response);
  }

  hideModal(): void {
    this.modalRef.hide();
  }
}
