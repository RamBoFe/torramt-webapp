import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Torrent } from '../../../models/torrent.models';
import { TorrentsService } from '../../../services/api/torrents.service';

interface DialogData {
  torrent: Torrent;
}

@Component({
  selector: 'app-modal-torrent-details',
  templateUrl: './modal-torrent-details.component.html',
  styleUrls: ['./modal-torrent-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DialogTorrentDetailsComponent implements OnInit {
  torrentDetailsHtml: SafeHtml;

  isLoading = true;

  constructor(
    public torrentsService: TorrentsService,
    private sanitizerService: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  async ngOnInit(): Promise<void> {
    const torrentDetailsHtml = await this.torrentsService.getTorrentDetails(
      this.data.torrent
    );
    this.torrentDetailsHtml =
      this.sanitizerService.bypassSecurityTrustHtml(torrentDetailsHtml);

    this.isLoading = false;
  }
}
