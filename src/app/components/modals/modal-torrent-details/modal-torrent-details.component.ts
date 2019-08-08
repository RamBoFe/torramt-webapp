import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MDBModalRef } from 'angular-bootstrap-md';
import { YggService } from '../../../services/api/torrents/ygg.service';

@Component({
  selector: 'app-modal-torrent-details',
  templateUrl: './modal-torrent-details.component.html',
  styleUrls: ['./modal-torrent-details.component.scss']
})
export class ModalTorrentDetailsComponent implements OnInit {
  torrentDetailsHtml: SafeHtml;
  torrent: object;

  constructor(public modalRef: MDBModalRef,
              private yggService: YggService,
              private sanitizerService: DomSanitizer
              ) {}

  async ngOnInit(): Promise<any> {
    const torrentDetailsHtml = await this.yggService.getTorrentDetails(this.torrent);
    this.torrentDetailsHtml = this.sanitizerService.bypassSecurityTrustHtml(torrentDetailsHtml);
  }
}
