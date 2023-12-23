import {Component, Inject, OnInit} from '@angular/core';
import {NasService, TAG_SEEDBOX} from '../../../services/api/nas/nas.service';
import {TorrentParseTitleService} from '../../../services/torrent/torrent-parse-title.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {File} from '../../../models/nas.model';

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
  files: File[];
  currentPathFile = '';
  selectedFile: File;
  isRoot = true;
  // subFolder: string;
  destinationPath: string;
  torrentTitleParsed: string;

  isLoading = false;
  isFilesLoading = true;
  constructor(
    private torrentParseTittleService: TorrentParseTitleService,
    public nasService: NasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogFtpToNasComponent>
  ) {}

  async ngOnInit(): Promise<void> {
    this.torrentTitleParsed = this.torrentParseTittleService.transformToPath(
      this.data.torrentName
    );
    this.destinationPath = this.torrentTitleParsed;
    this.files = await this.nasService.listFiles('');
    this.isFilesLoading = false;
    console.log(this.files);
  }

  async onTransferToNas(): Promise<void> {
    this.isLoading = true;

    try {
      console.log(this.data.type);
      console.log(this.destinationPath);
      console.log(this.currentPathFile);
      console.log(this.torrentTitleParsed);

      await this.nasService.transferToNas(
        `/${TAG_SEEDBOX}/${this.data.torrentName}`,
        this.destinationPath,
        this.torrentTitleParsed,
        this.data.type
      );
      this.dialogRef.close(true);
    } catch (e) {
      this.dialogRef.close(false);
    }

    this.isLoading = false;
  }

  async onListFiles(): Promise<void> {
    await this.listFiles(this.selectedFile.path);
  }

  async onListParentFiles(): Promise<void> {
    if (!this.isRoot) {
      const parentFile = this.currentPathFile.match(/.*\//)[0].slice(0, -1);
      await this.listFiles(parentFile);
    }
  }

  onAddFile(): void {}

  onSelectionChange(file: File) {
    this.selectedFile = file;
    this.destinationPath = `${file.path}${this.torrentTitleParsed}`;
  }

  private async listFiles(path: string): Promise<void> {
    this.isFilesLoading = true;
    this.files = await this.nasService.listFiles(path);
    this.isRoot = path.split('/').length === 1;
    this.destinationPath = this.isRoot ? `/${path}` : path;
    this.currentPathFile = path;
    this.isFilesLoading = false;
  }
}
