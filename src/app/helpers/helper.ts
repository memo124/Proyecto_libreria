import { Router } from "@angular/router";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class classHelper {

    constructor(private router: Router) { }

    public viewStatus(status:boolean): string{
      return (status === true) ? 'Active' : 'Inactive';
    }
}
