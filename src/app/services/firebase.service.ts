import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseConfig = {
    apiKey: 'AIzaSyC1JaeAXR1CcmoDYfFzELuVkkoNUlKOjPo',
    authDomain: 'torramt-831ee.firebaseapp.com',
    projectId: 'torramt-831ee',
    storageBucket: 'torramt-831ee.appspot.com',
    messagingSenderId: '528944375172',
    appId: '1:528944375172:web:792d0ef57c78a2972be9d1',
  };
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
