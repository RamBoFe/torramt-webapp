import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/site/footer/footer.component';
import { HeaderComponent } from './components/site/header/header.component';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './pages/home/home.component';

import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.routing';
import { TorrentsService } from './services/api/torrents/torrents.service';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { TorrentActiveProvidersComponent } from './components/forms/torrent-active-providers/torrent-active-providers.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalFtpToNasComponent } from './components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import { ModalTorrentDetailsComponent } from './components/modals/modal-torrent-details/modal-torrent-details.component';
import { ModalYesNoComponent } from './components/modals/modal-yes-no/modal-yes-no.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { FtpComponent } from './pages/ftp/ftp.component';
import { SeedboxComponent } from './pages/seedbox/seedbox.component';
import { DownloadTimePipe } from './pipes/download-time.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
import { PercentPipe } from './pipes/percent.pipe';
import { FtpService } from './services/api/ftp/ftp.service';
import { TransmissionService } from './services/api/torrents/management/transmission';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DefaultComponent,
    SeedboxComponent,
    FileSizePipe,
    FtpComponent,
    ModalFtpToNasComponent,
    ModalTorrentDetailsComponent,
    ModalYesNoComponent,
    TorrentActiveProvidersComponent,
    PercentPipe,
    DownloadTimePipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ToastrModule.forRoot()
  ],
  providers: [
    FormBuilder,
    TorrentsService,
    TransmissionService,
    FtpService,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalFtpToNasComponent,
    ModalTorrentDetailsComponent,
    ModalYesNoComponent,
    TorrentActiveProvidersComponent
  ]
})
export class AppModule { }
