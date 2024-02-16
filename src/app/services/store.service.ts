import { Injectable } from '@angular/core';
import { User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  /**
   * User logged in.
   */
  $user: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
}
