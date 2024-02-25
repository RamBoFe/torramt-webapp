// CORE
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';

// ROUTING
import { routing } from './app.routing';

// COMPONENTS
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/site/header/header.component';
import { SearchComponent } from './pages/search/search.component';
import { SeedboxComponent } from './pages/seedbox/seedbox.component';

// import { TorrentActiveProvidersComponent } from './components/forms/torrent-active-providers/torrent-active-providers.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogFtpToNasComponent } from './components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import { DialogTorrentDetailsComponent } from './components/modals/modal-torrent-details/modal-torrent-details.component';
import { DialogYesNoComponent } from './components/modals/modal-yes-no/modal-yes-no.component';
// import { FtpComponent } from './pages/ftp/ftp.component';

// PIPES
// import { DownloadTimePipe } from './pipes/download-time.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { GoogleSignInButtonComponent } from './components/google-sign-in-button/google-sign-in-button.component';
import { DownloadTimePipe } from './pipes/download-time.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
// import { PercentPipe } from './pipes/percent.pipe';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    SeedboxComponent,
    FileSizePipe,
    // FtpComponent,
    DialogFtpToNasComponent,
    DialogTorrentDetailsComponent,
    DialogYesNoComponent,
    DownloadTimePipe,
    GoogleSignInButtonComponent,
    // TorrentActiveProvidersComponent,
    // PercentPipe,
    // DownloadTimePipe,
    // LoaderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    ToastrModule.forRoot(),
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatListModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatMenuModule,
  ],
  providers: [
    FormBuilder,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
