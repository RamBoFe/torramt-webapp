import {Component, OnInit} from '@angular/core';
import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  async signIn() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: 'AIzaSyC1JaeAXR1CcmoDYfFzELuVkkoNUlKOjPo',
      authDomain: 'torramt-831ee.firebaseapp.com',
      projectId: 'torramt-831ee',
      storageBucket: 'torramt-831ee.appspot.com',
      messagingSenderId: '528944375172',
      appId: '1:528944375172:web:792d0ef57c78a2972be9d1',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const provider = new GoogleAuthProvider();
    try {
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);

      // Pull signed-in user credential.
      const user = result.user;
      console.log(user);
    } catch (e) {
      console.log(e);
    }
  }
}
