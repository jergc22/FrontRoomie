import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomiesComponent } from './roomies/roomies.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    HomeComponent,
    RoomsComponent,
    RoomiesComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDatepickerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatPaginatorModule
  ]
})
export class PublicModule { }
