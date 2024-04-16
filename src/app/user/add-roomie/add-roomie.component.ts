import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Roomie } from 'src/app/auth/model/roomie.model';

@Component({
  selector: 'app-add-roomie',
  templateUrl: './add-roomie.component.html',
  styleUrls: ['./add-roomie.component.css']
})
export class AddRoomieComponent implements OnInit{
  form: FormGroup;
  cities: any[] = []
  isLoading:boolean = false

  roomie: Roomie = new Roomie('', '', 0)

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      city: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.userService.getCities().subscribe(
      data => {
        this.cities = data
      }
    )
  }

  onSubmit(){
    if (this.form.valid) {
      this.isLoading = true
      this.roomie.title = this.form.value.title
      this.roomie.content = this.form.value.content
      this.roomie.city = this.form.value.city
      console.log(this.roomie)
      this.userService.saveRoomie(this.roomie).subscribe(
        data => {
          this.isLoading = false
          this.router.navigate(['/home'])
        },
        error => {
          this.isLoading = false
        }
      )
    }
  }

}
