import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ThemePalette} from '@angular/material/core';

interface DialogData {
  title: string;
  body: string;
  btnYes: ButtonAppareance;
  btnNo: ButtonAppareance;
}

interface ButtonAppareance {
  label: string;
  icon: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-modal-yes-no',
  templateUrl: './modal-yes-no.component.html',
  styleUrls: ['./modal-yes-no.component.scss'],
})
export class DialogYesNoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogYesNoComponent>
  ) {}

  onClickedYes(): void {
    this.dialogRef.close(true);
  }

  onClickedNo(): void {
    this.dialogRef.close(false);
  }
}
