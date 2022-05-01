// CORE
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {ToastrModule} from 'ngx-toastr';
import {environment} from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from '@angular/flex-layout';

// ROUTING
import {routing} from './app.routing';

// COMPONENTS
import {AppComponent} from './app.component';
import {FooterComponent} from './components/site/footer/footer.component';
import {HeaderComponent} from './components/site/header/header.component';
import {SearchComponent} from './pages/search/search.component';
import {SeedboxComponent} from './pages/seedbox/seedbox.component';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

// import { TorrentActiveProvidersComponent } from './components/forms/torrent-active-providers/torrent-active-providers.component';
import { DialogFtpToNasComponent } from './components/modals/modal-ftp-to-nas/modal-ftp-to-nas.component';
import {DialogTorrentDetailsComponent} from './components/modals/modal-torrent-details/modal-torrent-details.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogYesNoComponent } from './components/modals/modal-yes-no/modal-yes-no.component';
// import { FtpComponent } from './pages/ftp/ftp.component';

// PIPES
// import { DownloadTimePipe } from './pipes/download-time.pipe';
import { FileSizePipe } from './pipes/file-size.pipe';
// import { PercentPipe } from './pipes/percent.pipe';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    HeaderComponent,
    FooterComponent,
    SeedboxComponent,
    FileSizePipe,
    // FtpComponent,
    DialogFtpToNasComponent,
    DialogTorrentDetailsComponent,
    DialogYesNoComponent,
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
  ],
  providers: [
    FormBuilder,
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
