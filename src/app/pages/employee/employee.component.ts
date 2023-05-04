import { Component, OnInit } from '@angular/core';
import { classHelper } from 'src/app/helpers/helper';
import { employeeI } from 'src/app/interfaces/employee.interface';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees: employeeI[] = [];

  constructor(public employeeS:EmployeeService,public helper:classHelper){}

  ngOnInit(): void {
    this.employeeS.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  public viewStatus(status:boolean): string{
    return (status === true) ? 'Inactive' : 'Active';
  }

}
