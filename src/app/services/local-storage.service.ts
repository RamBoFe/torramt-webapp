import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly USER_KEY = 'User';
  private readonly WAITING_FOR_AUTHENTICATED_USER_KEY =
    'Waiting_For_Authenticated_User';

  saveUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user.toJSON()));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(this.USER_KEY)) as User;
  }

  setFlagWaitingForAuthenticatedUser(value: boolean): void {
    localStorage.setItem(
      this.WAITING_FOR_AUTHENTICATED_USER_KEY,
      JSON.stringify(value)
    );
  }

  getFlagWaitingForAuthenticatedUser(): boolean {
    return JSON.parse(
      localStorage.getItem(this.WAITING_FOR_AUTHENTICATED_USER_KEY)
    ) as boolean;
  }
}
