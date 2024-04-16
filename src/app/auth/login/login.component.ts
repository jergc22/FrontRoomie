import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UserLogin } from '../model/login.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading: boolean = false
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router, private snackBar:MatSnackBar) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login(){
    if (this.loginForm.valid) {
      const userLogin: UserLogin = this.loginForm.value;
      
      this.loading = true

      this.loginService.login(userLogin).subscribe(
        response => {
          
          const token = response.access_token
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('isLogged', 'true')

          const user = response.user

          if (user.role == 'admin') {
            sessionStorage.setItem('isAdmin', 'true')
          } else {
            sessionStorage.setItem('isAdmin', 'false')
          }

          this.router.navigate(['/home'])

          this.loading = false;
        },
        error => {
          this.loading = false;
          this.loginForm.controls['username'].setErrors({ 'invalid': true });
          this.loginForm.controls['password'].setErrors({ 'invalid': true });
          this.snackBar.open(error.error.text, 'Cerrar', {
            duration: 3000
          });
        }
      );
    }
  }
}
