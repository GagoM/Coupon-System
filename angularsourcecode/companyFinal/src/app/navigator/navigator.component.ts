import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company.model';
import { CompanyserviceService } from '../services/companyservice.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  company: Company = new Company();

  constructor(private service: CompanyserviceService) {
  }

  ngOnInit() {
    this.service.getUserName().subscribe(
      (company) => { this.company = new Company(company) },
      (error) => { console.log('something went wrong..') }
    );
  }

  logout() {
    this.service.logout().subscribe(
      (success) => {
        console.log('bye bye :)');
      },
      (error) => { console.log('something went wrong...') }
    );
    window.location.href = '../././login/login.html';

  }
}
