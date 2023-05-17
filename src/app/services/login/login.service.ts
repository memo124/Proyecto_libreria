import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginI } from 'src/app/interfaces/login.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf8'
    }),
  };

  public url:string = `${environment.uri}`;

  postLogin(form:object):Observable<responseI>{
    let direction = this.url+'login';
    return this.http.post<responseI>(direction, form,this.httpOptions);
  }
}
