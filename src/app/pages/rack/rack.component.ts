import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { classHelper } from 'src/app/helpers/helper';
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
  public formRack: FormGroup;
  public dataRack: rackI;
  public idRack: number = 0;
  public p: number = 1;

  constructor(public rackS:RackService, private helper:classHelper){
    this.formRack = new FormGroup({
      nameRack: new FormControl(),
      levels: new FormControl(),
      statusRack: new FormControl()
    });
  }

  ngOnInit(): void {
    this.getAllRack();
  }

  viewStatus(status:boolean): string {
    return this.helper.viewStatus(status);
  }

  sendForm(form:object): void {
    this.rackS.postRack(form).subscribe(data => {
      this.helper.messageAlert('Successfully',data.response,'success','Accepted');
      this.getAllRack();
    });
  }

  inactivateRack(idRack:number): void {
    this.rackS.deleteRacks(idRack).subscribe({
      next: data => {
        this.getAllRack();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  activateRack(idRack:number): void{
    this.rackS.putRacksActivate(idRack).subscribe({
      next: data => {
        this.getAllRack();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  getAllRack(){
    this.rackS.getRacks().subscribe(data => {
      this.racks = data;
    });
  }

  getRackById(idRack: number){
    this.rackS.getRackById(idRack).subscribe(data =>{
      this.dataRack = data;
      this.idRack = this.dataRack.idRack;
      this.formRack.setValue({
        'nameRack': this.dataRack.nameRack,
        'levels': this.dataRack.levels,
        'statusRack': this.dataRack.statusRack
      });
    });
  }

}
