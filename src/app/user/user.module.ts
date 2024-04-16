import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MatCardModule } from '@angular/material/card';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddRoomieComponent } from './add-roomie/add-roomie.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddRoomContentComponent } from './add-room-content/add-room-content.component';
import { MyRoomsComponent } from './my-rooms/my-rooms.component';
import { MyRoomiesComponent } from './my-roomies/my-roomies.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NewPasswordComponent } from './new-password/new-password.component';
@NgModule({
  declarations: [
    ProfileComponent,
    EditUserComponent,
    AddRoomieComponent,
    AddRoomComponent,
    AddRoomContentComponent,
    MyRoomsComponent,
    MyRoomiesComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressSpinnerModule
  ]
})
export class UserModule { }
