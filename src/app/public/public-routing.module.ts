import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomiesComponent } from './roomies/roomies.component';

const routes: Routes = [
  {
    path: '',
    component:NavbarComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'rooms', component: RoomsComponent },
      { path: 'roomies', component: RoomiesComponent }

    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
