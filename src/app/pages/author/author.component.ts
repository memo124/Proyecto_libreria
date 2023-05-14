import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
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
  public dataAuthor: authorI ;
  public filterName: string = "";
  public formAuthor: FormGroup;

  constructor(private authorS:AuthorService,private helper:classHelper){
    this.formAuthor = new FormGroup({
      idAuthor : new FormControl(''),
      nameAuthor: new FormControl('',[Validators.pattern(this.helper.validateSting())]),
      countryBirth: new FormControl(),
      dateBorn: new FormControl(),
      statusAuthor: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAlls();
  }

  getAlls(){
    this.authorS.getAuthor().subscribe(author =>{
      this.authors = author
    });
  }

  sendForm(form:object) {
    if(this.formAuthor.value.idAuthor){
      this.authorS.putAuthor(form,this.formAuthor.value.idAuthor).subscribe(author => {
        this.helper.messageAlert('Successfully',author.response,'success','Accepted');
        this.getAlls();
      });
    } else {
      this.authorS.postAuthor(form).subscribe(author =>{
        this.helper.messageAlert('Successfully',author.response,'success','Accepted');
        this.getAlls();
      });
    }
  }

  viewStatus(status:boolean){
    return this.helper.viewStatus(status);
  }

  geAuthorById(idAuthor: number){
    this.authorS.getAuthorById(idAuthor).subscribe(data=>{
      this.dataAuthor = data[0];
      this.formAuthor.setValue({
        'idAuthor':this.dataAuthor.idAuthor,
        'nameAuthor':this.dataAuthor.nameAuthor,
        'countryBirth':this.dataAuthor.countryBirth,
        'dateBorn': this.dataAuthor.dateBorn,
        'statusAuthor': this.dataAuthor.statusAuthor
      });
    })
  }

  inactivateAuthor(idAuthor: number) {
    this.authorS.deleteAuthor(idAuthor).subscribe(()=>{
      this.getAlls();
    });
  }

  activateAuthor(idAuthor: number){
    this.authorS.putAuthorActivate(idAuthor).subscribe(()=>{
      this.getAlls();
    });
  }
}
