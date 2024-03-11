import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  AuthError,
  AuthErrorCodes,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
  User,
} from 'firebase/auth';
import { config } from '../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private readonly auth: Auth;

  constructor() {
    initializeApp(config);
    this.auth = getAuth();
  }

  /**
   * Signin with Firebase.
   */
  async signIn(): Promise<void> {
    await signInWithRedirect(this.auth, new GoogleAuthProvider());
  }

  /**
   * Refresh the id Token.
   *
   * @param callback
   */
  async refreshToken(callback: (user: User) => void): Promise<void> {
    onAuthStateChanged(this.auth, user => callback(user));
  }

  /**
   * Returns a UserCredential from the redirect-based sign-in flow.
   */
  async callbackSignIn() {
    return await getRedirectResult(this.auth);
  }

  /**
   * Returns a human-readable auth error message.
   *
   * @param authError
   */
  getHumanReadableAuthErrorMessage(authError: AuthError): string {
    let errorMessage: string;
    const authEmail = authError.customData.email;

    switch (authError.code) {
      case AuthErrorCodes.USER_DISABLED:
        errorMessage = `Le compte associé à l'email ${authEmail} est désactivé.`;
        break;

      case AuthErrorCodes.USER_DELETED:
        errorMessage = `Le compte associé à l'email ${authEmail} est supprimé.`;
        break;

      default:
        errorMessage = "Une erreur inattendue s'est produite.";
    }

    return errorMessage;
  }

  /**
   * Sign out the current user.
   */
  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}
