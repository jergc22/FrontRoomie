// import { Component } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { PublicService } from 'src/app/public/services/public.service';
// import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
// import { EditRoomDialogComponent } from 'src/app/shared/edit-room-dialog/edit-room-dialog.component';
// import { UserService } from 'src/app/user/services/user.service';

// @Component({
//   selector: 'app-rooms',
//   templateUrl: './rooms.component.html',
//   styleUrls: ['./rooms.component.css']
// })
// export class RoomsComponent {
//   public rooms: any[] = [];

//   constructor(private userService: UserService, private snackbar: MatSnackBar, private router: Router, private dialog: MatDialog, private publicService: PublicService) { }

//   ngOnInit(): void {
//     this.loadRooms();
//   }

//   loadRooms(): void {
//     this.publicService.getRooms().subscribe(
//       (response: any) => {
//         this.rooms = response;
//       },
//       (error) => {
//         this.snackbar.open('No se han encontrado habitaciones', 'Cerrar', {
//           duration: 3000
//         });
//       }
//     );
//   }
//   confirmDelete(roomId: number): void {
//     const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
//       width: '350px',
//       data: "¿Estás seguro de que quieres eliminar esta habitación?"
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.deleteRoom(roomId);
//       }
//     });
//   }

//   deleteRoom(roomId: number): void {
//     this.userService.deleteMyRoom(roomId).subscribe(
//       () => {
//         this.snackbar.open('Habitación eliminada con éxito.', 'Cerrar', {
//           duration: 3000
//         });
//         this.loadRooms();  // Refresca la lista de habitaciones tras eliminar una.
//       },
//       error => {
//         this.snackbar.open('Error al eliminar la habitación.', 'Cerrar', {
//           duration: 3000
//         });
//       }
//     );
//   }

//   editRoom(room: any): void {
//     const dialogRef = this.dialog.open(EditRoomDialogComponent, {
//       width: '400px',
//       data: room
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.userService.editRoom(room.id, result).subscribe(
//           response => {
//             this.snackbar.open('Habitacion editada correctamente', 'Cerrar', { duration: 3000 });
//             this.loadRooms();
//           },
//           error => {
//             this.snackbar.open('Error editando la habitacion', 'Cerrar', { duration: 3000 });
//           }
//         );
//       }
//     });
//   }

//   goToImages(room_id: any){
//     this.router.navigate(['/user/add-room-content', room_id])
//   }
// }
