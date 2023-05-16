import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { genreI } from 'src/app/interfaces/genre.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getGenres(): Observable<genreI[]>{
    let directions = `${environment.uri}Genre?page=1&limit=100&actives=true`;
    return this.http.get<genreI[]>(directions,this.httpOptions);
  }

  postGenre(form:object):Observable<responseI>{
    let directions = `${environment.uri}Genre`;
    return this.http.post<responseI>(directions,form,this.httpOptions)
  }
}
