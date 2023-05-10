import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { classHelper } from 'src/app/helpers/helper';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(private router: Router, private helper: classHelper) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.helper.isAuthenticated()) {
        return true;
      }
      else {
          this.router.navigate(['/auth/sign-in']);
          this.helper.messageAlert('Token expired','Signin to continue','warning','Accepted');
          return false;
      }
  }

}
