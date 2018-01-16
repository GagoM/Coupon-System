import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import swal from 'sweetalert';

import { Company } from '../models/company.model';
import { AdminserviceService } from './../services/adminservice.service';
import { LoggerService } from '../services/logger.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-companies',
  templateUrl: './edit-companies.component.html',
  styleUrls: ['./edit-companies.component.css']
})
export class EditCompaniesComponent implements OnInit {

  loadingCompanies = true;
  companies: Company[] = [];
  company = new Company();
  updateCompanyForm: FormGroup;

  constructor(private service: AdminserviceService, private logger: LoggerService) { }

  ngOnInit() {
    this.getAllcompanies();
    this.updateCompanyForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    })
  }

  setCompany(company: Company) {
    this.company = company;
  }

  updateCompany() {
    this.service.updateCompany(this.company).subscribe(
      (res) => {
        swal("Success!", "Company updated succsessfully", "success");
        this.logger.info("company: '" + this.company.getName + "' updated by admin")
        this.getAllcompanies();
      },
      (error) => {
        swal("Failure!", "Error occured while trying to update company", "error");
        this.logger.error("admin failed to update company: '" + this.company.getName + "'")
      }
    );
  }

  deleteCompany() {
    this.service.deleteCompany(this.company).subscribe(
      (res) => {
        swal("Success!", "Company deleted succsessfully", "success");
        this.logger.info("company: '" + this.company.getName + "' deleted by admin")
        this.getAllcompanies();
      },
      (error) => {
        swal("Failure!", "Error occured while trying to delete company", "error");
        this.logger.error("admin failed to delete company: '" + this.company.getName + "'")
      }
    );
  }

  getAllcompanies() {
    this.service.getCompanies().subscribe(
      (companies) => {
        this.companies = [];
        for (let company of companies) {
          company = new Company(company);
          this.companies.push(company);
        }
        this.loadingCompanies = false;
      },
      (error) => { console.error('error getting companies...') }
    )
  }
} 
