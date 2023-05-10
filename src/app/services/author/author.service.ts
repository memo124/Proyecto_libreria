import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError  } from 'rxjs';
import { authorI } from 'src/app/interfaces/author.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getAuthor():Observable<authorI[]>{
    let direction = `${environment.uri}Author`;
    return this.http.get<authorI[]>(direction, this.httpOptions).pipe(
        retry(3),
        map(resp=>resp)
    );
  }

  getAuthorById(idAuthor:number):Observable<authorI[]>{
    let direction = `${environment.uri}Author/`+idAuthor;
    return this.http.get<authorI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map(resp=>resp)
    );
  }

  postAuthor(form:object):Observable<responseI>{
    let direction = `${environment.uri}Author`;
    return this.http.post<responseI>(direction, form,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putAuthor(form:object,idAuthor:number):Observable<responseI>{
    let direction = `${environment.uri}Author/`+idAuthor;
    return this.http.put<responseI>(direction, form,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putAuthorActivate(idAuthor:number):Observable<responseI>{
    let direction = `${environment.uri}Author/Activate/`+idAuthor;
    return this.http.put<responseI>(direction,'',this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  deleteAuthor(idAuthor:number):Observable<responseI>{
    let direction = `${environment.uri}Author/`+idAuthor;
    return this.http.delete<responseI>(direction,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }
}
