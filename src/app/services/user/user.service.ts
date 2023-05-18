import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError, map, throwError,retry } from 'rxjs';
import { userI } from 'src/app/interfaces/user.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getUsers(): Observable<userI[]>{
    let directions = `${environment.uri}User`;
    return this.http.get<userI[]>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getUsersById(idUser: number):Observable<userI[]>{
    let direction = `${environment.uri}User/`+idUser;
    return this.http.get<userI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  postUsers(form:object):Observable<responseI>{
    let direction = `${environment.uri}User/`;
    return this.http.post<responseI>(direction, form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putUsers(form:object,idUser:number):Observable<responseI>{
    let direction = `${environment.uri}User/`+idUser;
    return this.http.put<responseI>(direction,form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putUsersActivate(idUser:number):Observable<responseI>{
    let direction =  `${environment.uri}User/Activate`+idUser;
    return this.http.put<responseI>(direction,'', this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  deleteUsers(idUser:number):Observable<responseI>{
    let direction = `${environment.uri}User/`+idUser;
    return this.http.delete<responseI>(direction, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }
}
