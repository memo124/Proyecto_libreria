import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  public filterName: string = "";
  public formEmployee: FormGroup;
  public idEmployee: number = 0;
  public dataEmployee: employeeI ;

  constructor(private employeeS:EmployeeService,private helper:classHelper){
    this.formEmployee = new FormGroup({
      idEmployee : new FormControl('',Validators.required),
      nameEmployee: new FormControl('',[Validators.pattern(this.helper.validateSting())]),
      employeeNumber: new FormControl(),
      statusEmployee: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAlls();
  }

  getAlls(){
    this.employeeS.getEmployees().subscribe(employee =>{
      this.employees = employee
    });
  }

  sendForm(form:object) {
    if(this.idEmployee != 0 ){
      this.employeeS.putEmployees(form,this.idEmployee).subscribe(employee => {
        this.helper.messageAlert('Successfully',employee.response,'success','Accepted');
        this.getAlls();
      });
    } else {
      this.employeeS.postEmployees(form).subscribe(employee =>{
        this.helper.messageAlert('Successfully',employee.response,'success','Accepted');
        this.getAlls();
      });
    }
  }

  viewStatus(status:boolean){
    return this.helper.viewStatus(status)
  }

  getEmployeeById(idEmployee: number){
    this.employeeS.getEmployeesById(idEmployee).subscribe(data=>{
      this.dataEmployee = data [0];
      this.idEmployee = this.dataEmployee.idEmployee;
      this.formEmployee.setValue({
        'idEmployee':this.dataEmployee.idEmployee,
        'nameEmployee': this.dataEmployee.nameEmployee,
        'employeeNumber': this.dataEmployee.employeeNumber,
        'statusEmployee': this.dataEmployee.statusEmployee
      });
    })
  }

  inactivateEmployee(idEmployee:number) {
    this.employeeS.deleteEmployees(idEmployee).subscribe(()=>{
      this.getAlls();
    });
  }

  activateEmployee(idEmployee: number){
    this.employeeS.putEmployeesActivate(idEmployee).subscribe(()=>{
      this.getAlls();
    });
  }

}
