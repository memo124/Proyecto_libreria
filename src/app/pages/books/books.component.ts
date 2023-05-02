import { Component } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  public menus: object = [
    {option:"book"},
    {option:"author"},
    {option:"editorial"},
    {option:"employee"},
    {option:"genre"},
    {option:"rack"},
    {option:"reserve"},
    {option:"user"}
  ];

}
