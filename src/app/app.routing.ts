import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { FtpComponent } from './pages/ftp/ftp.component';
import { HomeComponent } from './pages/home/home.component';
import { SeedboxComponent } from './pages/seedbox/seedbox.component';

const appRoutes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: HomeComponent, pathMatch: 'full' },
      { path: 'seedbox', component: SeedboxComponent, pathMatch: 'full' },
      { path: 'ftp', component: FtpComponent, pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'search' }
];

export const routing = RouterModule.forRoot(appRoutes);
