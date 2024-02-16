import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  getAuth,
  getIdToken,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
} from 'firebase/auth';
import { config } from '../../firebase.config';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseConfig = config;

  constructor(private readonly storeSrv: StoreService) {
    initializeApp(this.firebaseConfig);
  }

  /**
   * Signin with Firebase.
   */
  async signIn(): Promise<void> {
    await signInWithRedirect(getAuth(), new GoogleAuthProvider());
  }

  /**
   * Refresh the id Token.
   *
   * @param user The user
   */
  async refreshToken(user: User): Promise<string> {
    onAuthStateChanged(getAuth(), user => {
      console.log('Youuuhououuuuu voici le user :', user);
      this.storeSrv.$user.next(user);
    });
    return await getIdToken(user);
  }

  callbackSignIn() {
    return getRedirectResult(getAuth());
  }
}
