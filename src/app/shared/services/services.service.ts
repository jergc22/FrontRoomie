import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public URLpublic:string = environment.backendURL + '/public/'
  public URLuser:string = environment.backendURL + '/user/'

  constructor(private http: HttpClient, private router:Router) { }

  getUserById(user_id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.URLuser}${user_id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      })
    });
  }
  
}
