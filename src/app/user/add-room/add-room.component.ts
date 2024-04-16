import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Room } from 'src/app/auth/model/room.model';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit{
  form: FormGroup;
  cities: any[] = []
  isLoading:boolean = false

  room: Room = new Room('', 0, new Date, false, false, false, 0, 0, false, 0, 0, '', '', 0);

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      description: ['', Validators.required],
      smoke: [false],
      pet: [false],
      priv_bath: [false],
      n_baths: [0, Validators.required],
      n_rooms: [0, Validators.required],
      garage: [false],
      n_roomies: [0, Validators.required],
      price: [0, Validators.required],
      location: ['', Validators.required],
      title: ['', Validators.required],
      city_id: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getCities().subscribe(
      data => {
        this.cities = data;
      }
    );
  }

  onSubmit(){
    if (this.form.valid) {
      this.isLoading = true
      this.room = this.form.value;
      this.userService.saveRoom(this.room).subscribe(
        data => {
          this.isLoading = false
          this.router.navigate(['/user/add-room-content', data.id]);
        },
        error => {
          this.isLoading = false
        }
      );
    }
  }
}
