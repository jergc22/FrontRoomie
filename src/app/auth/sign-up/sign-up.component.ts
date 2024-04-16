import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRegistration } from '../model/sign-up.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as moment from 'moment';
import { DATE_FORMAT } from 'src/app/utils/contants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ngOnInit(): void {
    this.userForm.controls['confirmPassword'].valueChanges.subscribe(() => {
      this.passwordMatchValidator();
    });
  }

  userForm: FormGroup;
  image: any;
  isSubmitting = false;

  imageFileName: string = 'Foto de Perfil'

  user: UserRegistration = new UserRegistration("", "", "", "", "", false, "", "", false, false, "", "");

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
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

  onSubmit() {
    if (this.userForm.valid) {
      if (this.userForm.invalid) {
        return;
      }
      this.isSubmitting = true

      this.user.name = this.userForm.value.name
      this.user.surname = this.userForm.value.surname
      this.user.username = this.userForm.value.username
      this.user.email = this.userForm.value.email
      this.user.password = this.userForm.value.password
      this.user.smoke = this.userForm.value.smoke
      this.user.instagram = this.userForm.value.instagram
      this.user.description = this.userForm.value.description
      this.user.work = this.userForm.value.work
      this.user.study = this.userForm.value.study
      this.user.birth = this.userForm.value.birth
      this.user.birth = moment(this.user.birth).format(DATE_FORMAT)
      this.user.image = this.userForm.value.image
      this.signUpService.registerUser(this.user).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/auth/login']);
        },
        error: (error: HttpErrorResponse) => {
          this.isSubmitting = false;
          this.snackBar.open(error.error.text, 'Cerrar', {
            duration: 3000
          });
        }
      });
    }
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

  passwordMatchValidator() {
    const password: string = this.userForm.controls['password'].value;
    const confirmPassword: string = this.userForm.controls['confirmPassword'].value;
    if (password !== confirmPassword) {
      this.userForm.controls['confirmPassword'].setErrors({ NoPassswordMatch: true });
    }
  }




}
