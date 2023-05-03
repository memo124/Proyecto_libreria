import { Router } from "@angular/router";
import { Injectable } from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class classHeader {

    constructor(private router: Router) { }

    // public b64_to_utf8() {
    //     let tok:string = '';
    //     let valor:any;
    //     tok = localStorage.getItem("token");
    //     valor = tok.split('.',2);
    //     return atob(valor[1]);
    // }

    // public validarToken(time:number) {
    //     let now = new Date();
    //     let mls:string = now.getTime().toString();
    //     if((time-parseInt(mls.slice(0,10)))<0) {
    //       // localStorage.removeItem("token");
    //       this.router.navigate(['/auth/sign-in']);
    //       this.mensjePersonalisado('Expiro el token','warning','Iniciar sesion para continuar.');
    //     }
    //   }

    // public mensjePersonalisado(titulo:string, icono:string, mensaje:string){
    //     Swal.fire({
    //       title: titulo,
    //       text: mensaje,
    //       icon: icono
    //     })
    // }

}
