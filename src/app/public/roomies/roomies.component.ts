import { Component, OnInit } from '@angular/core';
import { PublicService } from '../services/public.service';
import { ContactDialogComponent } from 'src/app/shared/contact-dialog/contact-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { environment } from 'src/app/enviroments/environment';
import { UserService } from 'src/app/user/services/user.service';
import { EditRoomieDialogComponent } from 'src/app/shared/edit-roomie-dialog/edit-roomie-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-roomies',
  templateUrl: './roomies.component.html',
  styleUrls: ['./roomies.component.css']
})
export class RoomiesComponent implements OnInit{

  public roomies: any[] = [];
  public totalRoomies = 0;  
  public pageIndex = 0;
  public pageSize = 10;  
  public pageSizeOptions: number[] = [5, 10, 20];
  public userImages: {[key: string]: string} = {};
  public cities: any[] = [];
  public selectedCityId: any = null;
  public errorOcurred: boolean = false

  constructor(private publicService: PublicService, private dialog: MatDialog,  private snackBar: MatSnackBar, private router: Router, private userService: UserService){}


  ngOnInit(): void {
    this.loadRoomies();
    this.loadCities();
  }

  loadRoomies(): void {
    this.publicService.getRoomies(this.pageIndex, this.pageSize, this.selectedCityId).subscribe(
      (response: any) => {
        this.roomies = response.rooms;
        this.totalRoomies = response.total;
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
    this.loadRoomies();
  }

  openDialog(user_id: any) {
    if (this.isLogged()) {
      this.dialog.open(ContactDialogComponent, {
        data: {user_id: user_id}
      });
    }
    else 
      this.snackBar.open('Necesitas loggearte para poder ver la informacion del usuario', 'Cerrar', {
      duration: 3000
    });
    
  }

  isLogged(): boolean {
    if(sessionStorage.getItem('isLogged')=='true'){
      return true
    }
    else
      return false
      
  }

  addRoomie(){
    if (this.isLogged()) {
      this.router.navigate(['/user/add-roomie'])
    }
    else{
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
    this.loadRoomies();
  }

  isAdmin(): boolean {
    if (sessionStorage.getItem('isAdmin') == 'true') {
      return true
    }
    else
      return false
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
