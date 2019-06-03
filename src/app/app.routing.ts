import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
    {
        path: '',
        component: DefaultComponent,
        children: [
            { path: '', component: HomeComponent, pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
