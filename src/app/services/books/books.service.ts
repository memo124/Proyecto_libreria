import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { booksI } from 'src/app/interfaces/books.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getBooks(): Observable<booksI[]>{
    let direction = `${environment.uri}Book?page=1&limit=100&actives=false`;
    return this.http.get<booksI[]>(direction,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  postBook(form:object):Observable<responseI>{
    let direction = `${environment.uri}Book`;
    return this.http.post<responseI>(direction,form,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  putBook(idBook:number,form:object):Observable<responseI>{
    let direction = `${environment.uri}Book/`+idBook;
    return this.http.put<responseI>(direction,form,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getBookById(idBook: number): Observable<booksI[]>{
    let direction = `${environment.uri}Book/`+idBook;
    return this.http.get<booksI[]>(direction,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  putBookActivate(idBook:number):Observable<responseI>{
    let direction = `${environment.uri}Book/Activate/`+idBook;
    return this.http.put<responseI>(direction,'',this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      // tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteBook(idBook:number):Observable<responseI>{
    let direction = `${environment.uri}Book/`+idBook;
    return this.http.delete<responseI>(direction,this.httpOptions).pipe(
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
