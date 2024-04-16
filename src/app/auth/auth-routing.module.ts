import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileImageComponent } from './profile-image/profile-image.component';
import { PwdRecoveryComponent } from './pwd-recovery/pwd-recovery.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'sign-up',
    component: SignUpComponent

  },
  {
    path: 'sign-up/photo',
    component: ProfileImageComponent

  },
  {
    path: 'pwd-recovery',
    component: PwdRecoveryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { 

}
