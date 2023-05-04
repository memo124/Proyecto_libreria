import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { authorI } from 'src/app/interfaces/author.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getAuthor():Observable<authorI[]>{
    let direction = `${environment.uri}Author`;
    return this.http.get<authorI[]>(direction, this.httpOptions);
  }
}
