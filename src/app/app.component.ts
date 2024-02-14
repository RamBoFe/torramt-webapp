import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { getAuth, getRedirectResult } from 'firebase/auth';
import { FirebaseService } from './services/firebase.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    readonly storeSrv: StoreService,
    private readonly firebaseSrv: FirebaseService,
    private readonly snackBarService: MatSnackBar
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const userCredential = await getRedirectResult(getAuth());
      if (userCredential) {
        this.storeSrv.$user.next(userCredential);
        this.snackBarService.open('Connexion réussie.', 'FERMER');
      }
      console.log(userCredential);
    } catch (e) {
      this.snackBarService.open(
        'Un problème est survenu lors de la connexion.'
      );
    }
  }

  async onSignIn() {
    try {
      await this.firebaseSrv.signIn();
    } catch (e) {
      this.snackBarService.open(
        'Un problème est survenu lors de la redirection vers Google.'
      );
    }
  }
}
