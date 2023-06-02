import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(public router:Router){}

  public menus : any = [
    {option:"book"},
    {option:"author"},
    {option:"editorial"},
    {option:"employee"},
    {option:"genre"},
    {option:"rack"},
    {option:"reserve"},
    {option:"user"}
  ];

  ngOnInit(): void {

  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  redirect(route:string){
    this.router.navigate([route]);
  }
}
