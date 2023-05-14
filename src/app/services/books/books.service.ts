import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    let direction = `${environment.uri}Book`;
    return this.http.get<booksI[]>(direction,this.httpOptions);
  }

  postBook(form:object):Observable<responseI>{
    let direction = `${environment.uri}Book`;
    return this.http.post<responseI>(direction,form,this.httpOptions);
  }

  putBook(idBook:number,form:object):Observable<responseI>{
    let direction = `${environment.uri}Book/`+idBook;
    return this.http.put<responseI>(direction,form,this.httpOptions);
  }

  getBookById(idBook: number): Observable<booksI[]>{
    let direction = `${environment.uri}Book/`+idBook;
    return this.http.get<booksI[]>(direction,this.httpOptions);
  }

  putBookActivate(idBook:number):Observable<responseI>{
    let direction = `${environment.uri}Book/Activate/`+idBook;
    return this.http.put<responseI>(direction,'',this.httpOptions);
  }

  deleteBook(idBook:number):Observable<responseI>{
    let direction = `${environment.uri}Book/`+idBook;
    return this.http.delete<responseI>(direction,this.httpOptions);
  }
}
