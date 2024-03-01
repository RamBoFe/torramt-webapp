import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  form = new FormGroup({
    protocol: new FormControl('https', [Validators.required]),
    host: new FormControl('', [Validators.required]),
    port: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}

  onClickSaveButton() {}
}
