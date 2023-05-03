import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { employeeI } from 'src/app/interfaces/employee.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  };

  getEmployees(): Observable<employeeI[]> {
    let directions = `${environment.uri}Employee`
    return this.http.get<employeeI[]>(directions,this.httpOptions);
  }
}
