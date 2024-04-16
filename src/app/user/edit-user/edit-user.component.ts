import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRegistration } from 'src/app/auth/model/sign-up.model';
import * as moment from 'moment';
import { DATE_FORMAT } from 'src/app/utils/contants';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  userForm: FormGroup;
  image: any;

  imageFileName: string = 'Foto de Perfil'

  user: UserRegistration = new UserRegistration("", "", "", "", "", false, "", "", false, false, "", "");

  constructor(
    private formBuilder: FormBuilder,
    private editService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      smoke: [],
      instagram: [''],
      description: [''],
      work: [''],
      study: [''],
      birth: [],
      image: [null]

    });
  }
  ngOnInit(): void {
    this.editService.getSelfInfo().subscribe(
      (response: any) => {
        this.userForm.patchValue({
          username: response.username,
          email: response.email,
          name: response.name,
          surname: response.surname,
          instagram: response.instagram,
          description: response.description,
          smoke: response.smoke,
          work: response.work,
          study: response.study,
          birth: new Date(response.birth)
        });
        const usernameControl = this.userForm.get('username');
        if (usernameControl) {
          usernameControl.disable();
        }

      }
    )
    


    }
  

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userForm.patchValue({
        image: file
      });
      this.imageFileName = file.name;
      this.image = file
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.user.name = this.userForm.value.name
      this.user.surname = this.userForm.value.surname
      this.user.username = this.userForm.value.username
      this.user.email = this.userForm.value.email
      this.user.smoke = this.userForm.value.smoke
      this.user.instagram = this.userForm.value.instagram
      this.user.description = this.userForm.value.description
      this.user.work = this.userForm.value.work
      this.user.study = this.userForm.value.study
      this.user.birth = this.userForm.value.birth
      this.user.birth = moment(this.user.birth).format(DATE_FORMAT)
      console.log(this.userForm.value)
      this.user.image = this.userForm.value.image
      console.log(this.user.image)
      this.editService.updateProfile(this.user).subscribe({
        next: () => {
          this.logout()
        },
        error: (error: HttpErrorResponse) => {
          this.snackBar.open(error.error.text, 'Cerrar', {
            duration: 3000
          });
        }
      })
    }
  }
  logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/auth/login"])
  }
  
  }

