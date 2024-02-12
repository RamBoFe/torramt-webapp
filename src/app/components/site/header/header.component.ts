import {Component, OnInit} from '@angular/core';
import {FirebaseService} from '../../../services/firebase.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private readonly firebaseSrv: FirebaseService) {}

  ngOnInit() {}

  async signIn() {
    try {
      const user = await this.firebaseSrv.signInWithPopup();
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }
}
