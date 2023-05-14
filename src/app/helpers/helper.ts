import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class classHelper {

    constructor(private router: Router) { }

    public viewStatus(status:boolean): string{
      return (status == true) ? 'Active' : 'Inactive';
    }

    public messageAlert(titleM:string,messageM:string,iconM:any,buttonM:string):void{
      Swal.fire({
        title: titleM,
        text: messageM,
        icon: iconM,
        confirmButtonText: buttonM
      })
    }

    public isAuthenticated():boolean{
        return localStorage.getItem("token") != '';
    }

    public validateSting(): string{
      return '/[a-z]/';
    }
}
