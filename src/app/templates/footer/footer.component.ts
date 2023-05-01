import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public anio:number = 0;

  ngOnInit(){
    var today = new Date();
    this.anio = today.getFullYear()
  }

}
