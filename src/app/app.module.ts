import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/site/header/header.component';
import { FooterComponent } from './components/site/footer/footer.component';
import { DefaultComponent } from './layouts/default/default.component';
import { HttpClientModule } from '@angular/common/http';

import { routing } from './app.routing';
import { YggService } from './services/api/torrents/ygg.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SeedboxComponent } from './pages/seedbox/seedbox.component';
import { TransmissionService } from './services/api/torrents/management/transmission';
import {FileSizePipe} from "./pipes/file-size.pipe";

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DefaultComponent,
    SeedboxComponent,
    FileSizePipe
  ],
  imports: [
    BrowserModule,
    routing,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    FormBuilder,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    YggService,
    TransmissionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
