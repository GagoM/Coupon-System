import { Component, OnInit } from '@angular/core';
import { Company } from '../models/Company.model';
import { CompanyserviceService } from '../services/companyservice.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  company: Company = new Company();
  constructor(private service: CompanyserviceService) { }

  ngOnInit() {

    this.service.getUserName().subscribe(
      (company) => { this.company = new Company(company) },
      (error) => { console.log('something went wrong...') }
    )
  }
}


