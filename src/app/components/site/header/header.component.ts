import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    readonly storeSrv: StoreService,
    private readonly userSrv: UserService
  ) {}

  onClickSignoutButton(): void {
    this.userSrv.signOut();
  }
}
