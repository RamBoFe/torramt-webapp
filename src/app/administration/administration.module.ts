import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { routes } from './administration.routing';
import { SettingsComponent } from './components/settings/settings.component';
import { UserResolver } from './resolvers/user.resolver';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    routes,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [UserResolver],
})
export class AdministrationModule {}
