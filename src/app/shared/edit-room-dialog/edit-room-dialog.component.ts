import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-edit-room-dialog',
  templateUrl: './edit-room-dialog.component.html',
  styleUrls: ['./edit-room-dialog.component.css']
})
export class EditRoomDialogComponent {
  roomForm: FormGroup;
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRoomDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.roomForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      smoke: [data.smoke],
      pet: [data.pet],
      priv_bath: [data.priv_bath],
      n_baths: [data.n_baths, Validators.required],
      n_rooms: [data.n_rooms, Validators.required],
      garage: [data.garage],
      n_roomies: [data.n_roomies, Validators.required],
      price: [data.price, Validators.required],
      location: [data.location, Validators.required],
      city_id: [data.city_id, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.userService.getCities().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error: any) => {
        console.error(error)
      }
    );
  }

  save(): void {
    if (this.roomForm.valid) {
      const updatedRoom = this.roomForm.value;
      this.dialogRef.close(updatedRoom);
    }
  }
}
