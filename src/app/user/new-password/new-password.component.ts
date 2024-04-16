import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{

  ngOnInit(): void {
    this.form.controls['repPassword'].valueChanges.subscribe(() => {
      this.passwordMatchValidator();
    });
  }

  form: FormGroup;
  loading: boolean = false;
  passwordsMatch: boolean = false;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar){
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(/^(?=.*[A-Z])(?=.*[!#$%&'()*+,\-./:;<=>?@\\^_`{|}~])(?=.*[0-9]).{8,}$/)]],
      repPassword: ['', [Validators.required]]
    })
  }

  getData(){
    this.loading = true
    let password = this.form.get('password')?.value;
    this.userService.changePassword(password).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Contraseña cambiada correctamente', 'Cerrar', {
          duration: 3000
        });
        this.router.navigate(['/home']);
      },
      error: (error:any) => {
        this.snackBar.open(error.error.text, 'Cerrar', {
          duration: 3000
        });
      },
    });
  }

  passwordMatchValidator() {
    const password: string = this.form.controls['password'].value;
    const confirmPassword: string = this.form.controls['repPassword'].value;
    if (password !== confirmPassword) {
      this.form.controls['repPassword'].setErrors({ NoPassswordMatch: true });
    }
  }
}
