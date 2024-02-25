import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'settings',
  },
  { path: 'settings', component: SettingsComponent },
];

export const routes = RouterModule.forChild(appRoutes);
