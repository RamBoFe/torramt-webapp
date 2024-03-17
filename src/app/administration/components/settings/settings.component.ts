import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserFirestore } from '../../../models/user-firestore.model';
import { FirebaseService } from '../../../services/firebase.service';
import { StoreService } from '../../../services/store.service';

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

  userConfig: UserFirestore;

  constructor(
    private readonly firebaseSrv: FirebaseService,
    private readonly storeSrv: StoreService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userConfig = await this.firebaseSrv.getDoc(
      this.firebaseSrv.collections.users,
      this.storeSrv.user$.value.uid
    );
    console.log(this.userConfig);
    this.initForm();
  }

  private initForm(): void {
    this.form.patchValue({
      protocol: this.userConfig.config.nas.protocol,
      host: this.userConfig.config.nas.host,
      port: this.userConfig.config.nas.port,
      login: this.userConfig.config.nas.user,
      password: this.userConfig.config.nas.pwd,
      tag: this.userConfig.config.seedbox.tag,
    });
  }

  onClickSaveButton() {}
}
