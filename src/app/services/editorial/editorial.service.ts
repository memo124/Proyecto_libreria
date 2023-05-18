import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,catchError, map, throwError,retry } from 'rxjs';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {
  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getEditorials(): Observable<editorialI[]>{
    let directions = `${environment.uri}Editorial`;
    return this.http.get<editorialI[]>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getEditorialsById(idEditorial: number):Observable<editorialI[]>{
    let direction = `${environment.uri}User/`+idEditorial;
    return this.http.get<editorialI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  postEditorials(form:object):Observable<responseI>{
    let direction = `${environment.uri}Editorial/`;
    return this.http.post<responseI>(direction, form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putEditorials(form:object,idEditorial:number):Observable<responseI>{
    let direction = `${environment.uri}Editorial/`+idEditorial;
    return this.http.put<responseI>(direction,form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putEditorialsActivate(idEditorial:number):Observable<responseI>{
    let direction =  `${environment.uri}Editorial/Activate`+idEditorial;
    return this.http.put<responseI>(direction,'', this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  deleteEditorials(idEditorial:number):Observable<responseI>{
    let direction = `${environment.uri}Editorial/`+idEditorial;
    return this.http.delete<responseI>(direction, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

}
