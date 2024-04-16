import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PublicService } from 'src/app/public/services/public.service';
import { environment } from 'src/app/enviroments/environment';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EditRoomieDialogComponent } from 'src/app/shared/edit-roomie-dialog/edit-roomie-dialog.component';

@Component({
  selector: 'app-my-roomies',
  templateUrl: './my-roomies.component.html',
  styleUrls: ['./my-roomies.component.css']
})
export class MyRoomiesComponent {
  public roomies: any[] = [];
  public userImages: {[key: string]: string} = {};

  constructor(private userService: UserService, private dialog: MatDialog,  private snackBar: MatSnackBar, private router: Router, private publicService: PublicService){}

  ngOnInit(): void {
    this.loadRoomies();
  }

  loadRoomies(): void {
    this.userService.getMyRoomies().subscribe(
      (response: any) => {
        this.roomies = response;
        this.roomies.forEach(roomie => {
          this.publicService.getUserById(roomie.user_id).subscribe(
            user => {
              if (user.image != null) {
                user.image = user.image.replace(/\\/g, "/")
                user.image = environment.imageURL + user.image
              }
              this.userImages[roomie.user_id] = user.image;
            }
          );
        });
      },
      (error) => {
        this.snackBar.open('No se han encontrado publicaciones', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  confirmDelete(roomieId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "¿Estás seguro de que quieres eliminar esta publicación?"
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoomie(roomieId);
      }
    });
  }
  
  deleteRoomie(roomieId: number): void {
    this.userService.deleteMyRoomie(roomieId).subscribe(
      () => {
        this.snackBar.open('Publicacion eliminada con éxito.', 'Cerrar', {
          duration: 3000
        });
        this.loadRoomies();
      },
      error => {
        this.snackBar.open('Error al eliminar la publicación.', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  editRoomie(room: any): void {
    const dialogRef = this.dialog.open(EditRoomieDialogComponent, {
        width: '400px',
        data: room
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.userService.editRoomie(room.id, result).subscribe(
                response => {
                    this.snackBar.open('Publicación editada correctamente', 'Cerrar', { duration: 3000 });
                    this.loadRoomies();
                },
                error => {
                    this.snackBar.open('Error editando la publicación', 'Cerrar', { duration: 3000 });
                }
            );
        }
    });
}
}
