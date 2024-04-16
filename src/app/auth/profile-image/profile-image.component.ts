import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit{
  addImageForm!: FormGroup;
  selectedImage!: File;
  isFileInputClicked = false

  constructor(private authService: LoginService, private fb: FormBuilder, private router: Router){
    this.addImageForm = this.fb.group({
      image: ['', Validators.required]
    })
  }
  ngOnInit(): void {}

  onImageChange(event: any){
    if (event.target.files && event.target.files.length > 0) {
      this.selectedImage = event.target.files[0];
      this.addImageForm.patchValue({ image: 'file_selected'})
    } else {
      this.addImageForm.patchValue({ image: ''})
    }
  }

  async onSubmitImage() {
    if (this.addImageForm.invalid) {
      return;
    }
    let image = { image: this.selectedImage}
    
    let user_id = this.authService.sharedId

    this.authService.updateImage(user_id, image).subscribe(
      response => {
        this.router.navigate(['/home'])
      },
      error => {
        console.error("error")
      }
    )
  }

}
