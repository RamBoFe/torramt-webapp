import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './pages/home/home.component';
import { SeedboxComponent } from './pages/seedbox/seedbox.component';

const appRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'seedbox', component: SeedboxComponent, pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
