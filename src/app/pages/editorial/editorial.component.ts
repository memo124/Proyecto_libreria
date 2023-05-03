import { Component, OnInit } from '@angular/core';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { EditorialService } from 'src/app/services/editorial/editorial.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {

  public editorials: editorialI[] = [];

  constructor(public editorialS:EditorialService){}

  ngOnInit(): void {
    this.editorialS.getEditorial().subscribe(data=>{
      this.editorials = data
    });
  }

}
