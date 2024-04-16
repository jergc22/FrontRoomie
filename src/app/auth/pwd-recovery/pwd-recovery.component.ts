import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pwd-recovery',
  templateUrl: './pwd-recovery.component.html',
  styleUrls: ['./pwd-recovery.component.css']
})
export class PwdRecoveryComponent {

  form: FormGroup;
  loading: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: LoginService, private router: Router, private snackBar: MatSnackBar){
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]]
    })
  }

  getData() {
    this.loading = true;
    let username = this.form.get('username')?.value;

    if (this.form.valid && username) {
      this.authService.pwdRecovery(username).subscribe({
        next: () => {
          this.loading = false
          this.snackBar.open("Se ha enviado una nueva contraseña a tu correo", 'Cerrar', {
            duration: 3000
          })
          this.router.navigate(['/home'])
        },
        error: (error) => {
          this.loading = false
          this.snackBar.open(error.error.text, 'Cerrar', {
            duration: 3000
          })
        }
      })
    }

  }

}
