import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Company } from '../models/company.model';
import { AdminserviceService } from './../services/adminservice.service';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/operators/concat';
@Component({
  selector: 'app-get-company',
  templateUrl: './get-company.component.html',
  styleUrls: ['./get-company.component.css']
})
export class GetCompanyComponent implements OnInit {

  compId: number = 0;
  company: Company = new Company();
  errorGet: boolean = false;
  showDetails: boolean = false;
  constructor(private service: AdminserviceService) {
  }

  ngOnInit() {
  }

  getCompany() {
    this.errorGet = false;
    this.showDetails = false;
    this.service.getCompany(this.compId).subscribe(
      (company) => {
        this.company = new Company(company)
        if (this.company.getName === null) {
          this.errorGet = true;
        } else {
          this.showDetails = true;
        }
      },
      (error) => {
        this.errorGet = true;
        console.log('something went wrong...')
      }
    );
  }


}
