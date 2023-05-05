import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { reserveI } from 'src/app/interfaces/reserve.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(public http : HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getReserves():Observable<reserveI[]>{
    let direction = `${environment.uri}Reserve`;
    return this.http.get<reserveI[]>(direction, this.httpOptions);
  }
}
