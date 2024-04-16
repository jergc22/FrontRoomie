import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  logged: boolean = false;
  admin: boolean = false;

  constructor(private router: Router){}
  ngOnInit(): void {

    this.logged = this.isLogged()
    this.admin = this.isAdmin()
    
  }
  

  activeButton: string = '';

  setActiveButton(button: string): void {
    this.activeButton = button;
    if (button == 'rooms') {
      this.router.navigate(['/home/rooms'])
    }
    if (button == 'roomies') {
      this.router.navigate(['/home/roomies'])
    }
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  goToSignUp(): void {
    this.router.navigate(['/auth/sign-up']);
  }

  isLogged(): boolean {
    if(sessionStorage.getItem('isLogged')=='true'){
      return true
    }
    else
      return false
      
  }

  isAdmin(): boolean {
    if(sessionStorage.getItem('isAdmin')=='true'){
      return true
    }
    else
      return false
      
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/auth/login"])
  }

  goProfile(){
    this.router.navigate(["/user/profile"])
  }

  goToMyRooms(){
    this.router.navigate(["/user/my-rooms"])
  }
  goToMyRoomies(){
    this.router.navigate(["/user/my-roomies"])
  }

  goToRoomies(){
    this.router.navigate(["/admin/roomies"])
  }
  goToRooms(){
    this.router.navigate(["/admin/rooms"])
  }
  goToUsers(){
    this.router.navigate(["/admin/users"])
  }

}
