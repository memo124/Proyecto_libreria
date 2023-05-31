import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, retry, throwError } from 'rxjs';
import { employeeI } from 'src/app/interfaces/employee.interface';
import { responseI } from 'src/app/interfaces/response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(public http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }),
  };

  getEmployees(): Observable<employeeI[]> {
    let directions = `${environment.uri}Employee?page=1&limit=1000&actives=false`;
    return this.http.get<employeeI[]>(directions,this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    );
  }



  getEmployeesById(idEmployee: number):Observable<employeeI[]>{
    let direction = `${environment.uri}Employee/`+idEmployee;
    return this.http.get<employeeI[]>(direction, this.httpOptions).pipe(
      retry(3),
      map(resp=>resp),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  postEmployees(form:object):Observable<responseI>{
    let direction = `${environment.uri}Employee/`;
    return this.http.post<responseI>(direction, form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putEmployees(form:object,idEmployee:number):Observable<responseI>{
    let direction = `${environment.uri}Employee/`+idEmployee;
    return this.http.put<responseI>(direction,form, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  putEmployeesActivate(idEmployee:number):Observable<responseI>{
    let direction =  `${environment.uri}Employee/Activate`+idEmployee;
    return this.http.put<responseI>(direction,'', this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }

  deleteEmployees(idEmployee:number):Observable<responseI>{
    let direction = `${environment.uri}Employee/`+idEmployee;
    return this.http.delete<responseI>(direction, this.httpOptions).pipe(
      map(resp=>resp),
       catchError((error) => {
        return throwError(() => error);
      })
    )
  }
}
