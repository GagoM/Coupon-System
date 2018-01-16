import { Component, OnInit } from '@angular/core';
import { Customer } from '../models/customer.model';
import { AdminserviceService } from '../services/adminservice.service';

@Component({
  selector: 'app-get-customer',
  templateUrl: './get-customer.component.html',
  styleUrls: ['./get-customer.component.css']
})
export class GetCustomerComponent implements OnInit {
  errorGet: boolean = false;
  showDetails: boolean = false;
  custId: number = 0;
  customer: Customer = new Customer();

  constructor(private service: AdminserviceService) {
  }

  getCustomer() {
    this.errorGet = false;
    this.showDetails = false;
    this.customer = new Customer();
    this.service.getCustomer(this.custId).subscribe(
      (customer) => {
        this.customer = new Customer(customer)
        if(this.customer.getName===null){
          this.errorGet = true;
        }else{
          this.showDetails = true;
        }
      },
      (error) => {
        this.errorGet = true;
        console.log('something went wrong...')
      }
    );
  }

  ngOnInit() {

  }
}
