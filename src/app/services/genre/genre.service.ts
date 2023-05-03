import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { genreI } from 'src/app/interfaces/genre.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getGenres(): Observable<genreI[]>{
    let directions = `${environment.uri}Genre`;
    console.log(directions);
    return this.http.get<genreI[]>(directions,this.httpOptions);
  }
}
