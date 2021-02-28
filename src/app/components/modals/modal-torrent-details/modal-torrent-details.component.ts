import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MDBModalRef } from 'angular-bootstrap-md';
import { TorrentsService } from '../../../services/api/torrents/torrents.service';

@Component({
  selector: 'app-modal-torrent-details',
  templateUrl: './modal-torrent-details.component.html',
  styleUrls: ['./modal-torrent-details.component.scss']
})
export class ModalTorrentDetailsComponent implements OnInit {
  torrentDetailsHtml: SafeHtml;
  torrent: object;

  constructor(public modalRef: MDBModalRef,
              public torrentsService: TorrentsService,
              private sanitizerService: DomSanitizer
              ) {}

  async ngOnInit(): Promise<void> {
    setTimeout(async () => {
      const torrentDetailsHtml = await this.torrentsService.getTorrentDetails(this.torrent);
      this.torrentDetailsHtml = this.sanitizerService.bypassSecurityTrustHtml(torrentDetailsHtml);
    });
  }
}
