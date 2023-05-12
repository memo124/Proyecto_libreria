import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getEditorial():Observable<editorialI[]>{
    let direction = `${environment.uri}Editorial`;
    return this.http.get<editorialI[]>(direction,this.httpOptions);
  }
}
