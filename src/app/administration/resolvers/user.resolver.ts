import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserFirestore } from '../../models/user-firestore.model';
import { FirebaseService } from '../../services/firebase.service';
import { StoreService } from '../../services/store.service';
@Injectable()
export class UserResolver implements Resolve<UserFirestore> {
  constructor(
    private readonly firebaseSrv: FirebaseService,
    private readonly storeSrv: StoreService
  ) {}

  async resolve(): Promise<UserFirestore> {
    return await this.firebaseSrv.getDoc(
      this.firebaseSrv.collections.users,
      this.storeSrv.user$.value.uid
    );
  }
}
