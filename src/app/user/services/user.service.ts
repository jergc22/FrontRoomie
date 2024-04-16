import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URLuser: string = environment.backendURL + '/user/'

  constructor(private http: HttpClient) { }

  getSelfInfo(): Observable<any> {
    return this.http.get<any>(`${this.URLuser}jwt`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  updateProfile(userData: any): Observable<any> {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });
    return this.http.put<any>(`${this.URLuser}edit-profile`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  getCities(): Observable<any> {
    return this.http.get<any>(`${this.URLuser}cities`);
  }

  getMyRooms(): Observable<any> {
    return this.http.get<any>(`${this.URLuser}my-rooms`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    })
  }

  getMyRoomies(): Observable<any> {
    return this.http.get<any>(`${this.URLuser}my-roomies`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    })
  }

  saveRoomie(roomie: any): Observable<any> {
    return this.http.post<any>(`${this.URLuser}add-roomie`, roomie, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    });
  }

  saveRoom(room: any): Observable<any> {
    return this.http.post<any>(`${this.URLuser}add-room`, room, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      })
    });
  }

  deleteMyRoom(room_id: any): Observable<any> {
    return this.http.delete<any>(`${this.URLuser}delete-room/${room_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    })
  }

  deleteMyRoomie(roomie_id: any): Observable<any> {
    return this.http.delete<any>(`${this.URLuser}delete-roomie/${roomie_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    })
  }

  editRoom(room_id: number, roomData: any): Observable<any> {
    return this.http.put<any>(`${this.URLuser}edit-room/${room_id}`, roomData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  editRoomie(roomie_id: number, roomieData: any): Observable<any> {
    return this.http.put<any>(`${this.URLuser}edit-roomie/${roomie_id}`, roomieData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  changePassword(newPassword: string): Observable<String> {
    const payload = { password: newPassword };
    return this.http.put<string>(`${this.URLuser}password`, payload, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  addContent(formData: any, room_id: any): Observable<String> {

    return this.http.post<string>(`${this.URLuser}add-room-content/${room_id}`, formData, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  deleteImage(image_id: any): Observable<any> {

    return this.http.delete<any>(`${this.URLuser}delete-room-content/${image_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

}




