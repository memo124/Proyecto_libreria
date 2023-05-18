import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
import { userI } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public user: userI[] = [];
  public dataUser: userI ;
  public filterName: string = "";
  public formUser: FormGroup;
  public idUser: number = 0;

  constructor(private userS:UserService,private helper:classHelper){
    this.formUser = new FormGroup({
      nameUser: new FormControl('',[Validators.pattern(this.helper.validateSting())]),
      carnetUser: new FormControl(),
      emailUser: new FormControl(),
      phoneUser: new FormControl(),
      statusUser: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAlls();
  }

  getAlls(){
    this.userS.getUsers().subscribe(user =>{
      this.user = user
    });
  }

  sendForm(form:object) {
    if(this.idUser != 0 ){
      this.userS.putUsers(form,this.idUser).subscribe(user => {
        this.helper.messageAlert('Successfully',user.response,'success','Accepted');
        this.getAlls();
      });
    } else {
      this.userS.postUsers(form).subscribe(user =>{
        this.helper.messageAlert('Successfully',user.response,'success','Accepted');
        this.getAlls();
      });
    }
  }

  viewStatus(status:boolean){
    return this.helper.viewStatus(status)
  }

  getUsersById(idUser: number){
    this.userS.getUsersById(idUser).subscribe(data=>{
      this.dataUser = data [0];
      this.idUser = this.dataUser.idUser;
      this.formUser.setValue({
        'idUser':this.dataUser.idUser,
        'nameUser': this.dataUser.nameUser,
        'carnetUser': this.dataUser.carnetUser,
        'emailUser': this.dataUser.emailUser,
        'phoneUser': this.dataUser.phoneUser,
        'statusUser': this.dataUser.statusUser
      });
    })
  }

  inactivateUser(idUser:number) {
    this.userS.deleteUsers(idUser).subscribe(()=>{
      this.getAlls();
    });
  }

  activateUser(idUser: number){
    this.userS.putUsersActivate(idUser).subscribe(()=>{
      this.getAlls();
    });
  }

}
