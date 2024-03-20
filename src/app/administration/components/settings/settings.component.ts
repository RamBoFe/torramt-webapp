import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UpdateData } from 'firebase/firestore';
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

  user: UserFirestore;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly firebaseSrv: FirebaseService,
    private readonly storeSrv: StoreService,
    private readonly snackBarSrv: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    this.user = this.route.snapshot.data['user'];
    this.initForm();
  }

  private initForm(): void {
    if (this.user) {
      this.form.patchValue({
        protocol: this.user.config.nas.protocol,
        host: this.user.config.nas.host,
        port: this.user.config.nas.port,
        login: this.user.config.nas.login,
        password: this.user.config.nas.password,
        tag: this.user.config.seedbox.tag,
      });
    }
  }

  async onClickSaveButton() {
    const datas: UpdateData<UserFirestore> = {};

    if (this.form.dirty) {
      try {
        if (this.user === undefined) {
          const { tag, ...nas } = this.form.value;

          await this.firebaseSrv.setDoc(
            this.firebaseSrv.collections.users,
            this.storeSrv.user$.value.uid,
            {
              email: this.storeSrv.user$.value.email,
              config: {
                nas,
                seedbox: { tag },
              },
            }
          );
        } else if (this.form.controls['tag'].dirty) {
          datas['config.seedbox.tag'] = this.form.value['tag'];
        } else {
          datas['config.nas'] = {
            protocol: this.form.value['protocol'],
            host: this.form.value['host'],
            port: +this.form.value['port'],
            login: this.form.value['login'],
            password: this.form.value['password'],
          };

          await this.firebaseSrv.updateDoc(
            this.firebaseSrv.collections.users,
            this.storeSrv.user$.value.uid,
            datas
          );
        }

        this.snackBarSrv.open('Modifications enregistrées', 'FERMER', {
          duration: 5000,
        });
      } catch (e) {
        this.snackBarSrv.open(
          "Impossible d'enregistrer les modifications",
          'FERMER',
          { duration: 5000 }
        );
      }
    }
  }
}
