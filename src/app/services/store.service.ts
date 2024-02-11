import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  /**
   * User sign in.
   */
  user$: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);

  /**
   * Loading signed in user.
   */
  loadingUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
