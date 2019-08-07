import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

interface Destination {
  name: string;
  alias: string;
}

@Component({
  selector: 'app-modal-ftp-to-nas',
  templateUrl: './modal-ftp-to-nas.component.html',
  styleUrls: ['./modal-ftp-to-nas.component.scss']
})

export class ModalFtpToNasComponent implements OnInit {

  transfert: Subject<any> = new Subject();
  destinations: Array<Destination>;
  selectedDest;
  subFolder = '';

  constructor(public modalRef: MDBModalRef) {}

  ngOnInit(): void {
    this.destinations = [
      { name: 'video', alias: 'Films'},
      { name: 'serie', alias: 'Séries' },
      { name: 'tv', alias:  'Tv'},
      { name: 'music', alias:  'Musiques'}
    ];
    this.selectedDest = this.destinations.find(
      d => d.name === 'video').name;
  }

  onTransfertoNas(): void {
    this.transfert.next({
      destination: this.selectedDest,
      subFolder: this.subFolder}
    );
  }

}
