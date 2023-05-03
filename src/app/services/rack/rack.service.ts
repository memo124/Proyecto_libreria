import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rackI } from 'src/app/interfaces/rack.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RackService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getRacks(): Observable<rackI[]>{
    let directions = `${environment.uri}Rack`;
    return this.http.get<rackI[]>(directions,this.httpOptions);
  }

}
