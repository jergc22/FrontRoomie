import { Component, OnInit } from '@angular/core';
import { PublicService } from '../services/public.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactDialogComponent } from 'src/app/shared/contact-dialog/contact-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';
import { environment } from 'src/app/enviroments/environment';
import { EditRoomDialogComponent } from 'src/app/shared/edit-room-dialog/edit-room-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  public rooms: any[] = [];
  public totalRooms = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions: number[] = [5, 10, 20];
  public cities: any[] = [];
  public selectedCityId: any = null;
  public errorOcurred: boolean = false



  constructor(private publicService: PublicService, private dialog: MatDialog, private snackBar: MatSnackBar, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.loadCities();
    this.loadRooms();
  }

  loadRooms(): void {
    this.publicService.getRooms(this.pageIndex, this.pageSize, this.selectedCityId).subscribe(
      (response: any) => {
        this.rooms = response.rooms;
        this.totalRooms = response.total;
        this.rooms.forEach(room => {
          this.publicService.getContent(room.id).subscribe(
            contentResponse => {
              room.images = contentResponse.map((item: any) => this.transformUrl(item.content));
              room.currentImageIndex = 0
            }
          )
        })

        this.errorOcurred = false
      },
      (error) => {

        if (!this.errorOcurred) {
          this.snackBar.open(error.error.text, 'Cerrar', {
            duration: 3000
          });
          this.selectedCityId = null;
          this.onCityChange(this.selectedCityId);
          this.errorOcurred = true
        }
      }
    );
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadRooms();
  }


  openDialog(user_id: any) {
    if (this.isLogged()) {
      this.dialog.open(ContactDialogComponent, {
        data: { user_id: user_id }
      });
    }
    else
      this.snackBar.open('Necesitas loggearte para poder ver la informacion del usuario', 'Cerrar', {
        duration: 3000
      });

  }

  isLogged(): boolean {
    if (sessionStorage.getItem('isLogged') == 'true') {
      return true
    }
    else
      return false

  }

  addRoom() {
    if (this.isLogged()) {
      this.router.navigate(['/user/add-room'])
    }
    else {
      this.snackBar.open('Necesitas loggearte para hacer una publicacion', 'Cerrar', {
        duration: 3000
      });

    }
  }

  loadCities(): void {
    this.userService.getCities().subscribe(
      (response: any) => {
        this.cities = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onCityChange(cityId: number): void {
    this.selectedCityId = cityId;
    this.loadRooms();
  }

  transformUrl(content: string): string {

    const transformed = content.replace(/\\\\/g, '/');

    return environment.imageURL + transformed;
  }
  setCurrentImage(room: any, increment: number): void {
    if (!room.images || room.images.length === 0) return;

    room.currentImageIndex = (room.currentImageIndex + increment + room.images.length) % room.images.length;
  }

  isAdmin(): boolean {
    if (sessionStorage.getItem('isAdmin') == 'true') {
      return true
    }
    else
      return false
  }

  editRoom(room: any) {
    const dialogRef = this.dialog.open(EditRoomDialogComponent, {
      width: '400px',
      data: room
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.editRoom(room.id, result).subscribe(
          response => {
            this.snackBar.open('Habitacion editada correctamente', 'Cerrar', { duration: 3000 });
            this.loadRooms();
          },
          error => {
            this.snackBar.open('Error editando la habitacion', 'Cerrar', { duration: 3000 });
          }
        );
      }
    });

  }

  confirmDelete(room_id: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "¿Estás seguro de que quieres eliminar esta habitación?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoom(room_id);
      }
    });

  }
  deleteRoom(roomId: number): void {
    this.userService.deleteMyRoom(roomId).subscribe(
      () => {
        this.snackBar.open('Habitación eliminada con éxito.', 'Cerrar', {
          duration: 3000
        });
        this.loadRooms();
      },
      error => {
        this.snackBar.open('Error al eliminar la habitación.', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  goToImages(room_id: any) {
    this.router.navigate(['/user/add-room-content', room_id])
  }
}


