import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  errorStatus:boolean = false;
  errorMsj:string = "";
  public loginForm: FormGroup;



  constructor(private router:Router, private loginS:LoginService) {
    this.loginForm = new FormGroup({
      userName : new FormControl('',Validators.compose([Validators.required])),
      carnet : new FormControl('',Validators.required)
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

  async onLogin(form:object){
    this.loginS.postLogin(form).subscribe(data=>{
       localStorage.setItem('token',data.toString());
    });
    this.router.navigate(['book']);
  }

}
