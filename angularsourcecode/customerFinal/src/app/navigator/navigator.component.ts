import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerserviceService } from '../services/customerservice.service';
import { Customer } from '../models/Customer.model';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {
  customer: Customer = new Customer();
  constructor(private service: CustomerserviceService) { }

  ngOnInit() {
    this.service.getUserName().subscribe(
      (customer) => { this.customer = new Customer(customer) },
      (error) => {
        console.log('something went wrong...')
      });
  }
  logout() {
    this.service.logout().subscribe();
    window.location.replace('../././login/login.html');
  }
}
