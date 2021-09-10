import { RouterModule, Routes } from '@angular/router';
import { FtpComponent } from './pages/ftp/ftp.component';
import { HomeComponent } from './pages/home/home.component';
import { SeedboxComponent } from './pages/seedbox/seedbox.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seedbox', component: SeedboxComponent },
  { path: 'ftp', component: FtpComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
