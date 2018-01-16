import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CustomerserviceService } from './customerservice.service';

@Injectable()
export class AuthGuardServiceService implements CanActivate{
  
  constructor(private router: Router,private service:CustomerserviceService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<boolean> {
      return this.service.loginCheck()
      .do(loggedIn => {
          if (!loggedIn) {
            window.location.href = '../././unAuth/unauthorized.html';
          }
      });
          }
    

}
