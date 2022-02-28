import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {TorrentsService} from '../../../services/api/torrents/torrents.service';
import {Torrent} from '../../../models/torrent.models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
  torrent: Torrent;
  torrentDetailsHtml: SafeHtml;

  isLoading = true;

  constructor(
    public torrentsService: TorrentsService,
    private sanitizerService: DomSanitizer,
    public dialogRef: MatDialogRef<DialogTorrentDetailsComponent>,
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
