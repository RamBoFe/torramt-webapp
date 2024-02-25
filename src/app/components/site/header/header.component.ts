import { Component } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    readonly storeSrv: StoreService,
    private readonly firebaseSrv: FirebaseService
  ) {}

  onClickSignoutButton(): void {
    this.firebaseSrv.signOut();
  }
}
