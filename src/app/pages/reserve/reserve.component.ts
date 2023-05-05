import { Component, OnInit } from '@angular/core';
import { reserveI } from 'src/app/interfaces/reserve.interface';
import { ReserveService } from 'src/app/services/reserve/reserve.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent  implements OnInit {

  public reserves: reserveI[] = [];
  public filterName: string = "";
  constructor(private reserveS:ReserveService){}

  ngOnInit(): void {
    this.reserveS.getReserves().subscribe(data =>{
      this.reserves = data;
    });
  }


}
