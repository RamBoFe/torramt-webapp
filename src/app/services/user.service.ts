import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
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
    private readonly storeSrv: StoreService
  ) {}

  async signIn(): Promise<void> {
    this.localStorageSrv.setFlagWaitingForAuthenticatedUser(true);
    await this.firebaseSrv.signIn();
  }

  async callbackSignIn() {
    const userCredential = await this.firebaseSrv.callbackSignIn();
    if (userCredential) {
      this.storeSrv.$user.next(userCredential.user);
      this.localStorageSrv.setFlagWaitingForAuthenticatedUser(false);
      this.localStorageSrv.saveUser(userCredential.user);
    }
  }

  async resumeSignIn() {
    const user: User = this.localStorageSrv.getUser();
    console.log('user :', user);
    if (user) {
      const idToken = await this.firebaseSrv.refreshToken(user);
      // console.log('idToken :', idToken);
      // console.log('user.getIdToken() :', user.getIdToken());
    }
  }

  signOut() {}
}
