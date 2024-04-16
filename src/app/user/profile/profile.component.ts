import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from 'src/app/enviroments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user: any;

  constructor(private service: UserService, private router: Router){}

    ngOnInit(): void {
      this.service.getSelfInfo().subscribe(
        (response: any) => {
          if (response.instagram && !response.instagram.startsWith('@')) {
            response.instagram = '@' + response.instagram;
          }
          if (response.image != null) {
            response.image = response.image.replace(/\\/g, "/")
            response.image = environment.imageURL + response.image
          }
          this.user = response
        },
        (error) => {
          console.error(error)
        }
      )
    }

    goEditProfile(){
      this.router.navigate(['/user/edit-profile'])
    }

    goEditPassword(){
      this.router.navigate(['/user/password'])
    }

}
