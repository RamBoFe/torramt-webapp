import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { UserResolver } from './resolvers/user.resolver';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'settings',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    resolve: { user: UserResolver },
  },
];

export const routes = RouterModule.forChild(appRoutes);
