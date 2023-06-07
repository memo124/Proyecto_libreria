import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
import { userI } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public users: userI[] = [];
  public filterName: string = "";
  public formUser:FormGroup;
  public idUser:number = 0;
  public p: number = 1;


  constructor(private userS:UserService, private helper:classHelper){
    this.formUser = new FormGroup({
      nameUser: new FormControl(),
      carnetUser: new FormControl(),
      emailUser: new FormControl(),
      phoneUser: new FormControl(),
      statusUser: new FormControl()
    });
  }

  ngOnInit(): void {
    this.loadusers();
  }

  loadusers(){
    this.userS.getUsers().subscribe(data=>{
      this.users = data
    });
  }

  viewStatus(status:boolean):string {
    return this.helper.viewStatus(status);
  }

  inactivateUser(idUser:number){
    this.userS.deleteInactivateUser(idUser).subscribe({
      next: data => {
        this.loadusers();
      },
      error:err  => {
        console.error(err);

      }
    });
  }

  activateUser(idUser:number){
    this.userS.putActivateUser(idUser).subscribe({
      next: data => {
        this.loadusers();
      },
      error:err  => {
        console.error(err);

      }
    });
  }

  sendForm(form:object){
    if (this.idUser != 0) {
      this.userS.putuser(this.idUser,form).subscribe({
        next: data => {
          this.loadusers();
          this.helper.messageAlert('Successfully',data.response,'success','Accepted');
        },
        error: err=>{
          console.error(err);
        }
      });
    } else {
      this.userS.postuser(form).subscribe({
        next: data => {
          this.loadusers();
          this.helper.messageAlert('Successfully',data.response,'success','Accepted');
        },
        error: err=>{
          console.error(err);
        }
      });
    }
  }

  getUserById(idUser:number){

    this.idUser = idUser;
    this.userS.getUserById(idUser).subscribe({
      next: data => {
        let datos = data;
        this.formUser.setValue({
          'nameUser': datos[0].nameUser,
          'carnetUser': datos[0].carnetUser,
          'emailUser': datos[0].emailUser,
          'phoneUser': datos[0].phoneUser,
          'statusUser': datos[0].statusUser
        });
      },
       error: err=>{
          console.error(err);
        }
    });
  }
}
