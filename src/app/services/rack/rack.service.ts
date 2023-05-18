import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError, retry } from 'rxjs';
import { rackI } from 'src/app/interfaces/rack.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkphdmllciBKYXJhbWlsbG8iLCJjYXJuZXQiOiJKSjAxMDk3MiIsImV4cCI6MTY4Mzc4MjM1MH0.OAw7mxDp26wMVv3-F0ePZWAVZlYnT0ki16C8vBh0ZXw'
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getRacks(): Observable<rackI[]>{
    let directions = `${environment.uri}Rack`;
    return this.http.get<rackI[]>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  getRacksById(idRack: number): Observable<rackI[]>{
    let direction = `${environment.uri}Rack`+idRack;
    return this.http.get<rackI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  postRacks(form:object):Observable<responseI>{
    let direction = `${environment.uri}Rack`;
    return this.http.post<responseI>(direction, form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putRacks(form:object, idRack: number): Observable<responseI>{
    let direction = `${environment.uri}Rack`+idRack;
    return this.http.put<responseI>(direction,form,this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putRacksActivate(idRack: number): Observable<responseI>{
    let direction = `${environment.uri}Rack/Activate`+idRack;
    return this.http.put<responseI>(direction,'',this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  deleteRacks(idRack: number): Observable<responseI>{
    let direction = `${environment.uri}Rack`+idRack;
    return this.http.delete<responseI>(direction, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

}
