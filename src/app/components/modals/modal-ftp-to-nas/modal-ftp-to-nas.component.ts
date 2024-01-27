import {Component, Inject, OnInit} from '@angular/core';
import {NasService, TAG_SEEDBOX} from '../../../services/api/nas/nas.service';
import {TorrentParseTitleService} from '../../../services/torrent/torrent-parse-title.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

interface Destination {
  name: string;
  alias: string;
}

interface DialogData {
  torrentName: string;
  type: string;
}

@Component({
  selector: 'app-modal-ftp-to-nas',
  templateUrl: './modal-ftp-to-nas.component.html',
  styleUrls: ['./modal-ftp-to-nas.component.scss'],
})
export class DialogFtpToNasComponent implements OnInit {
  destinations: Array<Destination>;
  selectedDest: string;
  subFolder: string;
  isLoading = false;

  constructor(
    private torrentParseTittle: TorrentParseTitleService,
    public nasService: NasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogFtpToNasComponent>
  ) {}

  ngOnInit(): void {
    this.subFolder = this.torrentParseTittle.transformToPath(
      this.data.torrentName
    );
    this.destinations = [
      {name: 'video', alias: 'Films'},
      {name: 'serie', alias: 'Séries'},
      {name: 'tv', alias: 'Tv'},
      {name: 'music', alias: 'Musiques'},
    ];
    this.selectedDest = this.destinations.find(d => d.name === 'video').name;
  }

  async onTransferToNas(): Promise<void> {
    this.isLoading = true;

    try {
      await this.nasService.transferToNas(
        `/${TAG_SEEDBOX}/${this.data.torrentName}`,
        this.selectedDest,
        this.subFolder,
        this.data.type
      );
      this.dialogRef.close(true);
    } catch (e) {
      this.dialogRef.close(false);
    }

    this.isLoading = false;
  }
}
