import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
import { editorialI } from 'src/app/interfaces/editorial.interface';
import { EditorialService } from 'src/app/services/editorial/editorial.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {
  public editorial: editorialI[] = [];
  public dataEditorial: editorialI ;
  public filterName: string = "";
  public formEditorial: FormGroup;
  public idEditorial: number = 0;

  constructor(private editorialS:EditorialService,private helper:classHelper){
    this.formEditorial = new FormGroup({
      idEditorial : new FormControl('',Validators.required),
      nameEditorial: new FormControl('',[Validators.pattern(this.helper.validateSting())]),
      dateAdd: new FormControl(),
      statusEditorial: new FormControl()
    });
  }

   ngOnInit(): void {
    this.getAlls();
  }

  getAlls(){
    this.editorialS.getEditorial().subscribe(editorial =>{
      this.editorial = editorial
    });
  }

sendForm(form:object) {
    if(this.idEditorial != 0 ){
      this.editorialS.putEditorial(form,this.idEditorial).subscribe(editorial => {
        this.helper.messageAlert('Successfully',editorial.response,'success','Accepted');
        this.getAlls();
      });
    } else {
      this.editorialS.postEditorial(form).subscribe(editorial =>{
        this.helper.messageAlert('Successfully',editorial.response,'success','Accepted');
        this.getAlls();
      });
    }
  }

  viewStatus(status:boolean){
    return this.helper.viewStatus(status)
  }

  getEditorialById(idEditorial: number){
    this.editorialS.getEditorialById(idEditorial).subscribe(data=>{
      this.dataEditorial = data [0];
      this.idEditorial = this.dataEditorial.idEditorial;
      this.formEditorial.setValue({
        'idEditorial':this.dataEditorial.idEditorial,
        'nameEditorial': this.dataEditorial.nameEditorial,
        'dateAdd': this.dataEditorial.dateAdd,
        'statusEditorial': this.dataEditorial.statusEditorial
      });
    })
  }

  inactivateEditorial(idEditorial:number) {
    this.editorialS.deleteEditorial(idEditorial).subscribe(()=>{
      this.getAlls();
    });
  }

  activateEditorial(idEditorial: number){
    this.editorialS.putEditorialActivate(idEditorial).subscribe(()=>{
      this.getAlls();
    });
  }
}



