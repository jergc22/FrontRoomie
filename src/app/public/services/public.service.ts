import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  public URL:string = environment.backendURL + '/public/'
  public URLuser:string = environment.backendURL + '/user/'


  constructor(private http:HttpClient, private router:Router) { }


  getRooms(pageIndex: any, pageSize: any, cityId?: number): Observable<any> {
    let endpoint = `${this.URL}rooms?page=${pageIndex+1}&per_page=${pageSize}`;
    if (cityId) {
        endpoint += `&city_id=${cityId}`;
    }
    return this.http.get<any>(endpoint);
    }
  

  getRoomies(pageIndex: any, pageSize: any, cityId?: number): Observable<any[]> {
    let endpoint = `${this.URL}roomies?page=${pageIndex+1}&per_page=${pageSize}`;
    if (cityId) {
        endpoint += `&city_id=${cityId}`;
    }
    return this.http.get<any>(endpoint);
    }

  getName(user_id:any): Observable<any>{
    return this.http.get<any>(`${this.URL}user/${user_id}`)
  }

  getUserById(user_id:any): Observable<any> {
    return this.http.get<any[]>(`${this.URLuser}${user_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }

  getContent(room_id: any): Observable<any>{
    return this.http.get<any>(`${this.URL}get-room-content/${room_id}`)
  }
  

  
  
}
