import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { classHelper } from 'src/app/helpers/helper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(public router:Router,private helper:classHelper){}

  public menus : any = [
    {option:"book"},
    {option:"author"},
    {option:"editorial"},
    {option:"employee"},
    {option:"genre"},
    {option:"rack"},
    {option:"reserve"},
    {option:"user"},
    {option:"dashboard"}
  ];

  public idusuario:string = "";

  ngOnInit(): void {
    let arrtoken = JSON.parse(this.helper.b64_to_utf8());
    this.idusuario =arrtoken.userName;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  redirect(route:string){
    this.router.navigate([route]);
  }
}
