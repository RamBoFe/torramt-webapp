import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthError } from 'firebase/auth';
import firebase from 'firebase/compat';
import { ApiCodeErrors } from '../enums/api-code-errors.enum';
import { AuthService } from './api/auth.service';
import { FirebaseService } from './firebase.service';
import { StoreService } from './store.service';
import enableLogging = firebase.database.enableLogging;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly firebaseSrv: FirebaseService,
    private readonly storeSrv: StoreService,
    private readonly snackBarSrv: MatSnackBar,
    private readonly authSrv: AuthService
  ) {}

  async signIn(): Promise<void> {
    await this.firebaseSrv.signIn();
  }

  async resumeSignIn(): Promise<void> {
    await this.firebaseSrv.refreshToken(async user => {
      try {
        // If is callback after first sign in.
        const userCredential = await this.firebaseSrv.callbackSignIn();

        this.storeSrv.user$.next(user ?? undefined);

        if (user) {
          const isValid = await this.authSrv.valid();
          if (!isValid) {
            this.storeSrv.user$.next(undefined);
            this.snackBarSrv.open(
              "Connexion impossible car votre compte n'est pas autorisé ou votre compte est supprimé.",
              'FERMER',
              {
                duration: 5000,
              }
            );
          } else {
            if (userCredential) {
              this.snackBarSrv.open('Connexion réussie.', 'FERMER', {
                duration: 5000,
              });
            }
          }
        }

        this.storeSrv.loadingUser$.next(false);
      } catch (e) {
        let message: string;
        if (e instanceof HttpErrorResponse) {
          if (e.error.code === ApiCodeErrors.UNAUTHORIZED) {
            message = "Vous n'êtes pas autorisé à accéder à cette application.";
          } else {
            message = "Une erreur inattendue s'est produite.";
          }
        } else {
          const _e = e as AuthError;
          message = this.firebaseSrv.getHumanReadableAuthErrorMessage(_e);
        }

        this.snackBarSrv.open(message, 'FERMER', { duration: 5000 });

        await this.firebaseSrv.signOut();
        this.storeSrv.user$.next(undefined);
        this.storeSrv.loadingUser$.next(false);
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
