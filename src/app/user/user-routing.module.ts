import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddRoomieComponent } from './add-roomie/add-roomie.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { AddRoomContentComponent } from './add-room-content/add-room-content.component';
import { MyRoomsComponent } from './my-rooms/my-rooms.component';
import { MyRoomiesComponent } from './my-roomies/my-roomies.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
  {
  path: '',
    component:NavbarComponent,
    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'my-rooms', component: MyRoomsComponent },
      { path: 'my-roomies', component: MyRoomiesComponent },
      { path: 'password', component: NewPasswordComponent }
    ]
  },
  {
    path: 'edit-profile',
    component: EditUserComponent
  },
  {
    path: 'add-roomie',
    component: AddRoomieComponent
  },
  {
    path: 'add-room',
    component: AddRoomComponent
  },
  {
    path: 'add-room-content/:id',
    component: AddRoomContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
