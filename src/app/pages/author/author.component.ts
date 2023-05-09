import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { authorI } from 'src/app/interfaces/author.interface';
import { AuthorService } from 'src/app/services/author/author.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  public authors: authorI[] = [];
  public filterName: string = "";
  public formAuthor: FormGroup;
  constructor(public authorS:AuthorService){
    this.formAuthor = new FormGroup({
      idAuthor : new FormControl('1',Validators.required),
      nameAuthor: new FormControl(),
      countryBirth: new FormControl(),
      dateBorn: new FormControl(),
      statusAuthor: new FormControl()
    });
  }

  ngOnInit(): void {
    this.authorS.getAuthor().subscribe(author =>{
      this.authors = author
    });
  }

  sendForm(form:object) {
    this.authorS.postAuthor(form).subscribe(author =>{
      Swal.fire({
        title: 'Complete',
        text: author.response,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    });
  }
}
