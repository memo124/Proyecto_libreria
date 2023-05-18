import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
import { rackI } from 'src/app/interfaces/rack.interface';
import { RackService } from 'src/app/services/rack/rack.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.css']
})
export class RackComponent implements OnInit {
  public rack: rackI[] = [];
  public dataRack: rackI;
  public filterName: string = "";
  public formRack: FormGroup;
  public idRack: number = 0;

  constructor(private rackS:RackService, private helper: classHelper){
    this.formRack = new FormGroup({
      nameRack: new FormControl('',[Validators.pattern(this.helper.validateSting())]),
      levels: new FormControl(),
      statusRack: new FormControl()
     });
  }

  ngOnInit(): void {
   this.getAlls();
  }

  getAlls(){
    this.rackS.getRacks().subscribe(rack =>{
      this.rack = rack
    });
  }

  sendForm(form:object) {
    if(this.idRack != 0 ){
      this.rackS.putRacks(form,this.idRack).subscribe(rack => {
        this.helper.messageAlert('Successfully',rack.response,'success','Accepted');
        this.getAlls();
      });
    } else {
      this.rackS.postRacks(form).subscribe(rack =>{
        this.helper.messageAlert('Successfully',rack.response,'success','Accepted');
        this.getAlls();
      });
    }
  }


  viewStatus(status:boolean){
    return this.helper.viewStatus(status)
  }

  getRacksById(idRack: number){
    this.rackS.getRacksById(idRack).subscribe(data=>{
      this.dataRack = data [0];
      this.idRack = this.dataRack.idRack;
      this.formRack.setValue({
        'idRack': this.dataRack.idRack,
        'nameRack': this.dataRack.nameRack,
        'levels': this.dataRack.levels,
        'statusRack': this.dataRack.statusRack
      });
    })
  }

  inactivateRack(idRack:number) {
    this.rackS.deleteRacks(idRack).subscribe(()=>{
      this.getAlls();
    });
  }

  activateRack(idRack:number) {
    this.rackS.putRacksActivate(idRack).subscribe(()=>{
      this.getAlls();
    });
  }


}
