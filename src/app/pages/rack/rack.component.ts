import { Component, OnInit } from '@angular/core';
import { rackI } from 'src/app/interfaces/rack.interface';
import { RackService } from 'src/app/services/rack/rack.service';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent implements OnInit {

  public racks: rackI[] = [];
  public filterName: string = "";

  constructor(public rackS:RackService){}

  ngOnInit(): void {
    this.rackS.getRacks().subscribe(data => {
      this.racks = data;
    });
  }

}
