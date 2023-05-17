import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError  } from 'rxjs';
import { userI } from 'src/app/interfaces/user.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getUser():Observable<userI[]>{
    let direction = `${environment.uri}User`;
    return this.http.get<userI[]>(direction, this.httpOptions).pipe(
        retry(3),
        map(resp=>resp)
    );
  }

  getuUserById(idUser:number):Observable<userI[]>{
    let direction = `${environment.uri}User/`+idUser;
    return this.http.get<userI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map(resp=>resp)
    );
  }

  postUser(form:object):Observable<userI>{
    let direction = `${environment.uri}User`;
    return this.http.post<userI>(direction, form,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putUser(form:object,idUser:number):Observable<userI>{
    let direction = `${environment.uri}User/`+idUser;
    return this.http.put<userI>(direction, form,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putUserActivate(idUser:number):Observable<userI>{
    let direction = `${environment.uri}User/Activate/`+idUser;
    return this.http.put<userI>(direction,'',this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }


  deleteUser(idUser:number):Observable<userI>{
    let direction = `${environment.uri}User/`+idUser;
    return this.http.delete<userI>(direction,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }


}
