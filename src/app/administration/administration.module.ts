import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { routes } from './administration.routing';
import { SettingsComponent } from './components/settings/settings.component';
import { DialogNasSharedFoldersComponent } from './modals/modal-nas-shared-folders/modal-nas-shared-folders.component';
import { UserResolver } from './resolvers/user.resolver';

@NgModule({
  declarations: [SettingsComponent, DialogNasSharedFoldersComponent],
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
    MatDialogModule,
    MatExpansionModule,
    FlexModule,
    MatProgressSpinnerModule,
  ],
  providers: [UserResolver],
})
export class AdministrationModule {}
