import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-google-sign-in-button',
  templateUrl: './google-sign-in-button.component.html',
  styleUrls: ['./google-sign-in-button.component.scss'],
})
export class GoogleSignInButtonComponent {
  @Output() click: EventEmitter<boolean> = new EventEmitter();
  static readonly GOOGLE_LOGO_URL = '../../assets/google-logo.svg';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'google-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        GoogleSignInButtonComponent.GOOGLE_LOGO_URL
      )
    );
  }

  onClick() {
    this.click.emit(true);
  }
}
