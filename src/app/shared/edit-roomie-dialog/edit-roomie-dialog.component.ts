import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-edit-roomie-dialog',
  templateUrl: './edit-roomie-dialog.component.html',
  styleUrls: ['./edit-roomie-dialog.component.css']
})
export class EditRoomieDialogComponent {
  roomieForm: FormGroup;
  cities: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditRoomieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService
  ) {
    this.roomieForm = this.fb.group({
      title: [data.title, Validators.required],
      content: [data.content, Validators.required],
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
    if (this.roomieForm.valid) {
      const updatedRoomie = this.roomieForm.value;
      this.dialogRef.close(updatedRoomie);
    }
  }

}
