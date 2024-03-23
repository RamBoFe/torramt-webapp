import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { File } from '../../../models/nas.model';
import { NasService } from '../../../services/api/nas.service';

interface DialogData {
  shortcutName: string;
}

@Component({
  selector: 'app-modal-nas-shared-folders',
  templateUrl: './modal-nas-shared-folders.component.html',
  styleUrls: ['./modal-nas-shared-folders.component.scss'],
})
export class DialogNasSharedFoldersComponent implements OnInit {
  files: File[];
  shortcutName: string;
  selectedPath = '/';

  isRoot = true;

  isLoading = false;
  isFilesLoading = true;
  constructor(
    public nasService: NasService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogNasSharedFoldersComponent>
  ) {}

  async ngOnInit(): Promise<void> {
    this.shortcutName = this.data.shortcutName;
    this.files = await this.nasService.listFiles('');
    this.isFilesLoading = false;
    console.log(this.files);
  }

  async onTransferToNas(): Promise<void> {
    this.dialogRef.close(this.selectedPath);
  }

  async onListFiles(): Promise<void> {
    await this.listFiles(this.selectedPath);
  }

  async onListParentFiles(): Promise<void> {
    if (!this.isRoot) {
      const parentFile = this.selectedPath.match(/.*\//)[0].slice(0, -1);
      await this.listFiles(parentFile);
    }
  }

  onAddFile(): void {}

  onSelectionChange(file: File) {
    this.selectedPath = file.path;
  }

  private async listFiles(path: string): Promise<void> {
    this.isFilesLoading = true;
    this.files = await this.nasService.listFiles(path);
    this.isRoot = path.split('/').length === 1;
    this.selectedPath = path;
    this.isFilesLoading = false;
  }
}
