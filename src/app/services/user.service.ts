import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthError } from 'firebase/auth';
import { FirebaseService } from './firebase.service';
import { LocalStorageService } from './local-storage.service';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly firebaseSrv: FirebaseService,
    private readonly localStorageSrv: LocalStorageService,
    private readonly storeSrv: StoreService,
    private readonly snackBarSrv: MatSnackBar
  ) {}

  async signIn(): Promise<void> {
    await this.firebaseSrv.signIn();
  }

  async resumeSignIn(): Promise<void> {
    await this.firebaseSrv.refreshToken(async user => {
      try {
        const userCredential = await this.firebaseSrv.callbackSignIn();
        if (userCredential) {
          this.snackBarSrv.open('Connexion réussie.', 'FERMER', {
            duration: 5000,
          });
        }

        this.storeSrv.user$.next(user ?? undefined);
      } catch (e) {
        this.snackBarSrv.open(
          this.firebaseSrv.getHumanReadableAuthErrorMessage(e as AuthError),
          'FERMER',
          { duration: 5000 }
        );
      }
    });
  }

  /**
   * Sign out
   */
  async signOut(): Promise<void> {
    await this.firebaseSrv.signOut();
  }
}
