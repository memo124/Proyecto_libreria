import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
import { booksI } from 'src/app/interfaces/books.interface';
import { employeeI } from 'src/app/interfaces/employee.interface';
import { reserveI } from 'src/app/interfaces/reserve.interface';
import { userI } from 'src/app/interfaces/user.interface';
import { BooksService } from 'src/app/services/books/books.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { ReserveService } from 'src/app/services/reserve/reserve.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent  implements OnInit {

  public reserves: reserveI[] = [];
  public dataReserve: reserveI;
  public books: booksI[] = [];
  public employees: employeeI[] = [];
  public users: userI[] = [];
  public filterName: string = "";
  public formReserve: FormGroup;
  public idReserve: number = 0;
  public idEmploye: number = 0;

  constructor(private helper:classHelper,private userS:UserService,private employeeS:EmployeeService,private bookS:BooksService,private reserveS:ReserveService){
    this.formReserve = new FormGroup({
      idBook: new FormControl(),
      idEmployee: new FormControl(),
      idUser: new FormControl(),
      statusReservation: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllReserves();
  }

  getAllReserves(){
    this.reserveS.getReserves().subscribe(data =>{
      this.reserves = data;
    });
  }

  getCombox(){
    this.bookS.getBooks().subscribe({
      next: data=>{
        this.books = data;
      },
      error: err=>{
        console.error(err);
      }
    });

    this.employeeS.getEmployees().subscribe({
      next: data=>{
        this.employees = data;
      },
      error: err=>{
        console.error(err);
      }
    });

    this.userS.getUsers().subscribe({
      next: data=>{
        this.users = data;
      },
      error: err=>{
        console.error(err);
      }
    });
  }

  sendForm(form:object) {
    this.reserveS.putReserve(this.idReserve,form).subscribe({
      next: data=>{
        this.helper.messageAlert('Successfully',data.response,'success','Accepted');
      },
      error: err=>{
        console.error(err);
      }
    });
  }

  activateReserve(idReserve:number){
    this.reserveS.putActivateReserve(idReserve).subscribe({
      next: data=>{
        this.getAllReserves();
      },
      error: err=>{
        console.error(err);
      }
    });
  }

  viewStatus(status:boolean){
    return this.helper.viewStatus(status);
  }

  inactivateReserve(idReserve:number){
    this.reserveS.deleteReserve(idReserve).subscribe({
      next: data=>{
        this.getAllReserves();
      },
      error: err=>{
        console.error(err);
      }
    });
  }


  getByIdReserve(idReserved:number){
    this.reserveS.getDataReserve(idReserved).subscribe(data =>{
      this.dataReserve = data[0];
      this.idReserve = idReserved;
      this.formReserve.setValue({
        'idBook': this.dataReserve.idBook,
        'idEmployee': this.dataReserve.idEmploye,
        'idUser': this.dataReserve.idUser,
        'statusReservation': this.dataReserve.statusReserve
      });
      this.getCombox();
    });
  }
}
