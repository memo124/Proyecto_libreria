import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    usuario : new FormControl('',Validators.compose([Validators.required])),
    password : new FormControl('',Validators.required)
  })

  constructor(private router:Router) { }

  errorStatus:boolean = false;
  errorMsj:string = "";

  ngOnInit(): void {
    this.checkLocalStorage();
  }

  checkLocalStorage(){
    if (localStorage.getItem("token")) {
      this.router.navigate(['encuentro ']);
    }
  }

  onLogin(form:any){
    this.router.navigate(['book']);
  }

}
