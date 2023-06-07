import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { responseI } from 'src/app/interfaces/response.interface';
import { userI } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('token')
    }),
  };

  getUsers(): Observable<userI[]>{
    let directions = `${environment.uri}User?page=1&limit=100&actives=false`;
    return this.http.get<userI[]>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  putActivateUser(idUser:number): Observable<responseI>{
    let directions = `${environment.uri}User/Activate/`+idUser;
    return this.http.put<responseI>(directions,'',this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteInactivateUser(idUser:number): Observable<responseI>{
    let directions = `${environment.uri}User/`+idUser;
    return this.http.delete<responseI>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getUserById(idUser:number): Observable<userI[]>{
    let directions = `${environment.uri}User/`+idUser;
    return this.http.get<userI[]>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postuser(form:object): Observable<responseI>{
    let directions = `${environment.uri}User`;
    return this.http.post<responseI>(directions,form,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  putuser(idUser:number,form:object): Observable<responseI>{
    let directions = `${environment.uri}User/`+idUser;
    return this.http.put<responseI>(directions,form,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'Error en la conexión'+error.error+'';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
        errorMessage=`Problemas con el servidor, codigo de estado:${error.status}, Mensaje: `, error.error;
    }
    // Return an observable with a user-facing error message.
    errorMessage+=' Ocurrio un problema; Contactarse con IT.'
    return throwError(() => new Error(errorMessage));
  }
}
