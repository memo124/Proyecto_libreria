import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      'Content-Type': 'application/json'
    }),
  };

  getAuthor():Observable<authorI[]>{
    let direction = `${environment.uri}Author`;
    return this.http.get<authorI[]>(direction, this.httpOptions);
  }

  getAuthorById(idAuthor:number):Observable<authorI>{
    let direction = `${environment.uri}Author/`+idAuthor;
    return this.http.get<authorI>(direction, this.httpOptions);
  }

  postAuthor(form:object):Observable<responseI>{
    let direction = `${environment.uri}Author`;
    return this.http.post<responseI>(direction, form,this.httpOptions)
  }

  putAuthor(form:object,idAuthor:number):Observable<responseI>{
    let direction = `${environment.uri}Author/`+idAuthor;
    return this.http.put<responseI>(direction, form,this.httpOptions)
  }

  putAuthorActivate(idAuthor:number):Observable<responseI>{
    let direction = `${environment.uri}Author/Activate/`+idAuthor;
    return this.http.put<responseI>(direction,'',this.httpOptions)
  }

  deleteAuthor(idAuthor:number):Observable<responseI>{
    let direction = `${environment.uri}Author/`+idAuthor;
    return this.http.delete<responseI>(direction,this.httpOptions)
  }
}
