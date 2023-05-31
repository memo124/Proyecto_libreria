import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EditorialService {
  constructor(public http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  getEditorial(): Observable<editorialI[]> {
    let direction = `${environment.uri}Editorial?page=1&limit=1000&actives=false`;
    return this.http.get<editorialI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map((resp) => resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getEditorialById(idEditorial: number): Observable<editorialI> {
    let direction = `${environment.uri}Editorial/` + idEditorial;
    return this.http.get<editorialI>(direction, this.httpOptions).pipe(
      retry(3),
      map((resp) => resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  postEditorial(form: object): Observable<responseI> {
    let direction = `${environment.uri}Editorial`;
    return this.http.post<responseI>(direction, form, this.httpOptions).pipe(
      map((resp) => resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  putEditorial(form: object, idEditorial: number): Observable<responseI> {
    let direction = `${environment.uri}Editorial/` + idEditorial;
    return this.http.put<responseI>(direction, form, this.httpOptions).pipe(
      map((resp) => resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  putEditorialActivate(idEditorial: number): Observable<editorialI> {
    let direction = `${environment.uri}Editorial/Activate/` + idEditorial;
    return this.http.put<editorialI>(direction, '', this.httpOptions).pipe(
      map((resp) => resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  deleteEditorial(idEditorial: number): Observable<responseI> {
    let direction = `${environment.uri}Editorial/` + idEditorial;
    return this.http.delete<responseI>(direction, this.httpOptions).pipe(
      map((resp) => resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
