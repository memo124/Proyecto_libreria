import { Component, OnInit } from '@angular/core';
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
  constructor(private userS:UserService){}

  ngOnInit(): void {
    this.userS.getUser().subscribe(data=>{
      this.users = data
    });
  }

}
