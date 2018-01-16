import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { AdminserviceService } from '../services/adminservice.service';
import { LoggerService } from '../services/logger.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit {

  loadingCustomers = true;
  customers: Customer[] = [];
  customer = new Customer();
  updateCustomerForm: FormGroup;

  constructor(private service: AdminserviceService, private logger: LoggerService) { }

  ngOnInit() {
    this.getAllCustomers();
    this.updateCustomerForm = new FormGroup({
      'password': new FormControl(null, Validators.required)
    })
  }

  setCustomer(customer: Customer) {
    this.customer = customer;
  }

  updateCustomer() {

    this.service.updateCustomer(this.customer).subscribe(
      (res) => {
        swal("Success!", "Customer updated succsessfully", "success");
        this.logger.info("customer: '" + this.customer.getName + "' updated by admin")
        this.getAllCustomers();
      },
      (error) => {
        swal("Failure!", "Error occured while trying to update customer", "error");
        this.logger.error("admin failed to update customer: '" + this.customer.getName + "'")
      }
    );
  }
  deleteCustomer() {
    this.service.deleteCustomer(this.customer).subscribe(
      (res) => {
        swal("Success!", "Customer deleted succsessfully", "success");
        this.logger.info("customer: '" + this.customer.getName + "' deleted by admin")
        this.getAllCustomers();
      },
      (error) => {
        swal("Failure!", "Error occured while trying to delete customer", "error");
        this.logger.error("admin failed to delete customer: '" + this.customer.getName + "'")
      }
    );

  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe(
      (customers) => {
        this.customers = [];
        for (let customer of customers) {
          customer = new Customer(customer);
          this.customers.push(customer);
        }
        this.loadingCustomers = false;
      },
      (error) => console.error('error getting customers..')
    )
  }
}
