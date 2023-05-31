import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { reserveI } from 'src/app/interfaces/reserve.interface';
import { responseI } from 'src/app/interfaces/response.interface';
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

  getDataReserve(idReserve:number):Observable<reserveI[]>{
    let direction = `${environment.uri}Reserve/`+idReserve;
    return this.http.get<reserveI[]>(direction, this.httpOptions);
  }

  putReserve(idReserve:number,form:object):Observable<responseI>{
    let direction = `${environment.uri}Reserve/`+idReserve;
    return this.http.put<responseI>(direction,form, this.httpOptions);
  }

  putActivateReserve(idReserve:number):Observable<responseI>{
    let direction = `${environment.uri}Reserve/Activate/`+idReserve;
    return this.http.put<responseI>(direction,'', this.httpOptions);
  }

  deleteReserve(idReserve:number):Observable<responseI>{
    let direction = `${environment.uri}Reserve/`+idReserve;
    return this.http.delete<responseI>(direction, this.httpOptions);
  }

  postReserve(form:object):Observable<responseI>{
    let direction = `${environment.uri}Reserve`;
    return this.http.post<responseI>(direction,form,this.httpOptions)
  }
}
