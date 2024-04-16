import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
// import { RoomsComponent } from './rooms/rooms.component';
import { RoomiesComponent } from './roomies/roomies.component';
import { UsersComponent } from './users/users.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    RoomiesComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class AdminModule { }
