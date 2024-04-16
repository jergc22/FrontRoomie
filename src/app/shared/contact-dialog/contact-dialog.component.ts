import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicesService } from '../services/services.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit{
  
  info: any = {}
  
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private service: ServicesService, private snackBar: MatSnackBar,) {}
  
  
  ngOnInit(): void {
    this.getInfo()
  }

  getInfo(){
    this.service.getUserById(this.data.user_id).subscribe(
      (response: any[]) => {
        this.info = response;
        if (this.info.instagram && !this.info.instagram.startsWith('@')) {
          this.info.instagram = '@' + this.info.instagram;
        }
      },
      (error) => {
        this.snackBar.open(error, 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

}
