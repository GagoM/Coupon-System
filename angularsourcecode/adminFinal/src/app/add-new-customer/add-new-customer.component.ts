import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { AdminserviceService } from '../services/adminservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoggerService } from '../services/logger.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-add-new-customer',
  templateUrl: './add-new-customer.component.html',
  styleUrls: ['./add-new-customer.component.css']
})
export class AddNewCustomerComponent implements OnInit {

  c: Customer = new Customer();
  customers: Customer[] = [];
  newCustomerForm: FormGroup;
  constructor(private service: AdminserviceService, private logger: LoggerService) { }
  ngOnInit() {
    this.getAllCustomers();
    this.newCustomerForm = new FormGroup({
      'custName': new FormControl(null, [Validators.required, this.uniqueNameValidator.bind(this)]),
      'password': new FormControl(null, Validators.required)
    })
  }
  createCustomer() {
    var self = this;
    self.service.createCustomer(self.c).subscribe(
      (res) => {
        swal("Success!", "Customer created succsessfully", "success");
        this.logger.info("customer: '" + this.c.getName + "' created by admin"),
          this.newCustomerForm.reset(), this.getAllCustomers()
      },
      (error) => {
        swal("Failure!", "Error while trying to create customer", "error");
        this.logger.error("admin failed to create customer: '" + this.c.getName + "'")
      }
    )
  }

  getAllCustomers() {
    this.service.getAllCustomers().subscribe(
      (customers) => {
        this.customers = [];
        for (let customer of customers) {
          customer = new Customer(customer);
          this.customers.push(customer);
        }
      },
      (error) => { console.error('something went wrong...') }
    );
  }

  uniqueNameValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;

    var exist = false;
    for (var i = 0; i < self.customers.length; i++) {
      if (self.customers[i].getName === control.value) {
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
