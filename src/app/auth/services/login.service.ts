import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/enviroments/environment';
import { UserLogin } from '../model/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public URLPublic:string = environment.backendURL + '/public'
  public URLlogin:string = environment.backendURL + '/login'
  public URLsignup:string = environment.backendURL + '/public/save'
  public URLimage:string = environment.backendURL + '/public/profile-image'
  public  IMGUR_UPLOAD_URL = 'https://api.imgur.com/3/image'
  IMGUR_CLIENT_ID = 'aa59813676f821d';
  public headersImgur = new HttpHeaders({
    Authorization: 'Client-ID ' + this.IMGUR_CLIENT_ID
  });
  public httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'})
  public httpHeadersFile: HttpHeaders = new HttpHeaders();

  constructor(private http:HttpClient, private router:Router) { }

  login(userLogin:UserLogin) : Observable<any>{
    return this.http.post<any>(this.URLlogin, userLogin, {headers:this.httpHeaders})
  }


  registerUser(userData: any): Observable<any> {
    const formData = new FormData();
    Object.keys(userData).forEach(key => {
      formData.append(key, userData[key]);
    });
    return this.http.post<any>(this.URLsignup, formData);
  }

  
  sharedId: any

  updateImage(user_id: any, image: any): Observable<any>{
    return this.http.post<any>(`${this.URLimage}/${user_id}`, image, {headers: this.httpHeadersFile})
  }
  
  postImage(image: any) {
    return this.http.post<any>(this.IMGUR_UPLOAD_URL, image, {headers: this.headersImgur} )
  }

  pwdRecovery(username: string): Observable<String>{
    const payload = { username: username}
    return this.http.put<String>(`${this.URLPublic}/password`, payload)
  }
}
