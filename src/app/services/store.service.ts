import { Injectable } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  /**
   * User logged in.
   */
  $user: BehaviorSubject<UserCredential> = new BehaviorSubject<UserCredential>(
    undefined
  );
}
