import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../models/company.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import swal from 'sweetalert';

import { AdminserviceService } from '../services/adminservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../services/logger.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-new-company',
  templateUrl: './create-new-company.component.html',
  styleUrls: ['./create-new-company.component.css']
})
export class CreateNewCompanyComponent implements OnInit {
  newCompanyForm: FormGroup;
  c: Company = new Company();
  companies: Company[] = [];

  constructor(private service: AdminserviceService, private logger: LoggerService) { }

  ngOnInit() {
    var self = this;
    this.getAllCompanies();
    self.newCompanyForm = new FormGroup({
      'compName': new FormControl(null, [Validators.required, this.uniqueNameValidator.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }
  
  createCompany() {
    this.service.createCompany(this.c).subscribe(
      (res) => {
        swal("Success!", "Company created succsessfully", "success");
        this.logger.info("company: '" + this.c.getName + "' created by admin")
        this.getAllCompanies();
        this.newCompanyForm.reset();
      },
      (error) => {
        swal("Failure!", "Error occured while trying to add company", "error");
        this.logger.error("admin failed to create company: '" + this.c.getName + "'")
      }
    )
  }

  getAllCompanies() {
    this.service.getCompanies().subscribe(
      (companies) => {
        this.companies = [];
        for (let company of companies) {
          company = new Company(company);
          this.companies.push(company);
        }
      },
      (error) => { console.error('something went wrong...') }
    )
  }

  uniqueNameValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;

    var exist = false;
    for (var i = 0; i < self.companies.length; i++) {
      if (self.companies[i].getName === control.value) {
        exist = true;
        break;
      }
    }
    if (exist === true) {
      return { 'nameIsAlreadyTaken': true };
    }
    return null;

  }
}
