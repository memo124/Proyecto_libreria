import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { classHelper } from 'src/app/helpers/helper';

export class FormModel {
  carnet: string;
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  errorStatus:boolean = false;
  errorMsj:string = "";
  public loginForm: FormGroup;



  constructor(private router:Router, private loginS:LoginService, private helper: classHelper) {
    this.loginForm = new FormGroup({
      userName : new FormControl('',Validators.compose([Validators.required])),
      carnet : new FormControl('',Validators.required),
      submitBtn: new FormControl
    })
  }

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
      if (localStorage.getItem("token")) {
        this.router.navigate(['book']);
      }
  }

  isSubmitting: boolean = false;

  async onLogin(form:FormModel){
    this.loginForm.disable();
    this.isSubmitting = true;

    if(form.carnet!="" && form.username!=""){

      this.loginS.postLogin(form).subscribe(data=>{

        if(data != undefined && data != null){
         localStorage.setItem('token',data.toString());
         this.router.navigate(['book']);
        }
        else{
         this.helper.messageAlert('Ingrese credenciales validas','MotherFucker','warning','Oki');
        }

        this.loginForm.enable();
        this.isSubmitting = false;
     });
    }
    else{

      this.helper.messageAlert('Pero ingresa algo por lo menos','TARADO','warning','Oki:c');
      this.loginForm.enable();
      this.isSubmitting = false;
    }
  }

}
