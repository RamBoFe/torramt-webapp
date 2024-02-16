import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from './services/firebase.service';
import { LocalStorageService } from './services/local-storage.service';
import { StoreService } from './services/store.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    readonly storeSrv: StoreService,
    private readonly firebaseSrv: FirebaseService,
    private readonly snackBarService: MatSnackBar,
    private readonly userSrv: UserService,
    private readonly localStorageSrv: LocalStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      console.log(this.localStorageSrv.getFlagWaitingForAuthenticatedUser());
      if (this.localStorageSrv.getFlagWaitingForAuthenticatedUser()) {
        await this.userSrv.callbackSignIn();
      } else {
        await this.userSrv.resumeSignIn();
      }

      this.snackBarService.open('Connexion réussie.', 'FERMER');
    } catch (e) {
      console.log(e);
      this.snackBarService.open(
        'Un problème est survenu lors de la connexion.'
      );
    }
  }

  async onSignIn() {
    try {
      await this.userSrv.signIn();
    } catch (e) {
      this.snackBarService.open(
        'Un problème est survenu lors de la redirection vers Google.'
      );
    }
  }
}
