import { Component } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { Http } from '@angular/http';
import { window } from 'rxjs/operator/window';
import { Session } from 'selenium-webdriver';
import { Router } from '@angular/router';
import { CompanyserviceService } from './services/companyservice.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private service:CompanyserviceService,private router: Router){}
  ngOnInit(){

  }
}
