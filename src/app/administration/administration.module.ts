import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { routes } from './administration.routing';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [SettingsComponent],
  imports: [CommonModule, routes],
})
export class AdministrationModule {}
