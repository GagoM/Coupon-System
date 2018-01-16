import { Injectable } from '@angular/core';

import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';


import { Observable } from 'rxjs/Observable';
import { AdminserviceService } from './adminservice.service';
import 'rxjs/add/operator/do'
@Injectable()
export class AuthGuardServiceService implements CanActivate {

  constructor(private router: Router, private service: AdminserviceService) {
  }

  ngOnInit() {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    console.log(this.service.loginCheck())
    return this.service.loginCheck()
      .do(loggedIn => {
        if (!loggedIn) {
          window.location.href = '../././unAuth/unauthorized.html';
        }
      });
  }


}
