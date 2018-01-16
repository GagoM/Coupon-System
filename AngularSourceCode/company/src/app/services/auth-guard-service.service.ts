import { Injectable } from '@angular/core';

import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CompanyserviceService } from '.././services/companyservice.service';
import { Company } from '.././models/Company.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardServiceService implements CanActivate {
  constructor(private router: Router, private service: CompanyserviceService) {
  }

  ngOnInit() {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    return this.service.loginCheck()
      .do(loggedIn => {
        if (!loggedIn) {
          window.location.href = '../././unAuth/unauthorized.html';
        }
      });
  }


}
