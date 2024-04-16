import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicService } from 'src/app/public/services/public.service';
import { environment } from 'src/app/enviroments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room-content',
  templateUrl: './add-room-content.component.html',
  styleUrls: ['./add-room-content.component.css']
})
export class AddRoomContentComponent implements OnInit {
  selectedFile!: File;
  imageFileName: string = 'Seleccionar Imagen'
  roomId!: number;
  images: any[] = []


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private publicService: PublicService, private snackbar: MatSnackBar, private dialog: MatDialog) { }  // Injectar el router

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.paramMap.get('id')!;
    this.getRooms()
  }

  getRooms(){
    this.publicService.getContent(this.roomId).subscribe(
      response => {
        this.images = response;
        for (let image of this.images) {
          image.content = this.transformUrl(image.content)
        }
      },
      error => {
        console.error('Error retrieving content:', error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
      this.imageFileName = this.selectedFile.name
    } else {
      alert('Please select an image.');
    }

  }

  onSubmit(event: any) {
    event.preventDefault();
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.userService.addContent(formData, this.roomId).subscribe(
        () => {
          this.snackbar.open('Imagen subida exitosamente.', 'Cerrar', {
            duration: 3000
          });
          this.getRooms()
        },
        error => {
          alert("error");
        }
      );
    } else {
      alert('Please select an image before submitting.');
    }
  }
  transformUrl(content: string): string {

    const transformed = content.replace(/\\\\/g, '/');

    return environment.imageURL + transformed;
  }


  deleteImage(image_id: number) {
    this.userService.deleteImage(image_id).subscribe(
      response => {
        if (response) {
          this.images = this.images.filter(image => image.id !== image_id);
          this.snackbar.open('Imagen borrada exitosamente', 'Cerrar', {
            duration: 3000
          });
          this.getRooms()
        } else {
          this.snackbar.open('Error borrando la imagen.', 'Cerrar', {
            duration: 3000
          });
        }
      },
      error => {
        this.snackbar.open('Error borrando la imagen.', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  confirmDeleteImage(imageId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Seguro que quieres borrar la imagen?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteImage(imageId);
      }
    });
  }

  goHome(){
    this.router.navigate(["/home"])
  }

}

