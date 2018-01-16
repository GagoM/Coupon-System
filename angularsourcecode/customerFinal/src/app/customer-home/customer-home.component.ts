import { Component, OnInit } from '@angular/core';
import { CustomerserviceService } from '../services/customerservice.service';
import { Customer } from '../models/Customer.model';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {
customer:Customer = new Customer();

  constructor(private service:CustomerserviceService) { }

  ngOnInit() {
this.service.getUserName().subscribe(
  (customer)=>{this.customer=new Customer(customer)},
  (error)=>{ console.log('something went wrong...')} 
);
  }

}
