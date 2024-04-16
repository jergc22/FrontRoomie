import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { EditRoomDialogComponent } from 'src/app/shared/edit-room-dialog/edit-room-dialog.component';
import { PublicService } from 'src/app/public/services/public.service';
import { environment } from 'src/app/enviroments/environment';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.component.html',
  styleUrls: ['./my-rooms.component.css']
})
export class MyRoomsComponent {

  public rooms: any[] = [];

  constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router, private dialog: MatDialog, private publicService: PublicService) { }

  ngOnInit(): void {
    this.loadRooms();
  }

  loadRooms(): void {
    this.userService.getMyRooms().subscribe(
      (response: any) => {
        this.rooms = response;
        this.rooms.forEach(room => {
          this.publicService.getContent(room.id).subscribe(
            contentResponse => {
              room.images = contentResponse.map((item: any) => this.transformUrl(item.content));
              room.currentImageIndex = 0
            }
          )
        })

      },
      (error) => {
        this.snackbar.open('No se han encontrado habitaciones', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }
  confirmDelete(roomId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "¿Estás seguro de que quieres eliminar esta habitación?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoom(roomId);
      }
    });
  }

  deleteRoom(roomId: number): void {
    this.userService.deleteMyRoom(roomId).subscribe(
      () => {
        this.snackbar.open('Habitación eliminada con éxito.', 'Cerrar', {
          duration: 3000
        });
        this.loadRooms(); 
      },
      error => {
        this.snackbar.open('Error al eliminar la habitación.', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  editRoom(room: any): void {
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {
      width: '400px',
      data: room
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.editRoom(room.id, result).subscribe(
          response => {
            this.snackbar.open('Habitacion editada correctamente', 'Cerrar', { duration: 3000 });
            this.loadRooms();
          },
          error => {
            this.snackbar.open('Error editando la habitacion', 'Cerrar', { duration: 3000 });
          }
        );
      }
    });
  }

  goToImages(room_id: any){
    this.router.navigate(['/user/add-room-content', room_id])
  }

  setCurrentImage(room: any, increment: number): void {
    if (!room.images || room.images.length === 0) return;
    
    room.currentImageIndex = (room.currentImageIndex + increment + room.images.length) % room.images.length;
  }

  transformUrl(content: string): string {

    const transformed = content.replace(/\\\\/g, '/');

    return environment.imageURL + transformed;
  }
}
