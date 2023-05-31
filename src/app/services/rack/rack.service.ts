import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { rackI } from 'src/app/interfaces/rack.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getRacks(): Observable<rackI[]>{
    let directions = `${environment.uri}Rack?page=1&limit=1000&actives=false`;
    return this.http.get<rackI[]>(directions,this.httpOptions);
  }

  getRackById(idRack:number): Observable<rackI>{
    let directions = `${environment.uri}Rack/`+idRack;
    return this.http.get<rackI>(directions,this.httpOptions);
  }

  postRack(form:object):Observable<responseI>{
    let direction = `${environment.uri}Rack`;
    return this.http.post<responseI>(direction,form,this.httpOptions)
  }

  putRacks(form:object,idRack:number):Observable<responseI>{
    let direction = `${environment.uri}Rack/`+idRack;
    return this.http.put<responseI>(direction,form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putRacksActivate(idRack:number):Observable<responseI>{
    let direction =  `${environment.uri}Rack/Activate/`+idRack;
    return this.http.put<responseI>(direction,'', this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  deleteRacks(idRack:number):Observable<responseI>{
    let direction = `${environment.uri}Rack/`+idRack;
    return this.http.delete<responseI>(direction, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }
}
