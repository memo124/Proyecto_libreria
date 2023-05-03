import { Component, OnInit } from '@angular/core';
import { authorI } from 'src/app/interfaces/author.interface';
import { AuthorService } from 'src/app/services/author/author.service';
@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  public authors: authorI[] = [];

  constructor(public authorS:AuthorService){

  }

  ngOnInit(): void {
    this.authorS.getAuthor().subscribe(author =>{
      this.authors = author
    });
  }
}
