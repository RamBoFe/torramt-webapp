import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirebaseService } from './services/firebase.service';
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
    private readonly snackBarSrv: MatSnackBar,
    private readonly userSrv: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      await this.userSrv.resumeSignIn();
    } catch (e) {
      console.log(e);
      this.snackBarSrv.open('Un problème est survenu lors de la connexion.');
    }
  }

  async onSignIn() {
    try {
      await this.userSrv.signIn();
    } catch (e) {
      this.snackBarSrv.open(
        'Un problème est survenu lors de la redirection vers Google.'
      );
    }
  }
}
