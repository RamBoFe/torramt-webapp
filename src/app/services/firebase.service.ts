import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { config } from '../../firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseConfig = config;

  constructor() {
    initializeApp(this.firebaseConfig);
  }

  /**
   * Signin with Firebase.
   */
  async signIn(): Promise<void> {
    await signInWithRedirect(getAuth(), new GoogleAuthProvider());
  }
}
