import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { booksI } from 'src/app/interfaces/books.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getBooks(): Observable<booksI[]>{
    let direction = `${environment.uri}Book`;
    return this.http.get<booksI[]>(direction,this.httpOptions);
  }
}
