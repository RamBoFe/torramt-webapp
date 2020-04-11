import { Component, OnInit, ViewChild } from '@angular/core';
import { CollapseComponent, MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';
import { TorrentParseTitleService } from '../../../services/torrent/torrent-parse-title.service';

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

  @ViewChild(CollapseComponent) moreOptions: CollapseComponent;

  transfert: Subject<any> = new Subject();
  destinations: Array<Destination>;
  selectedDest;
  subFolder = '';
  torrentName: string;
  moreOptionsCollapsed = false;

  constructor(public modalRef: MDBModalRef, private torrentParseTittle: TorrentParseTitleService) {}

  ngOnInit(): void {
    this.subFolder = this.torrentParseTittle.formatForScrapper(this.torrentName);
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

  showMoreOptions(): void {
    this.moreOptions.toggle();
    this.moreOptionsCollapsed = !this.moreOptionsCollapsed;
  }
}
