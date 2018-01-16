import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/Coupon.model';
import { CustomerserviceService } from '../services/customerservice.service';
import { LoggerService } from '../services/logger.service';
import { Customer } from '../models/Customer.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-purchase-coupon',
  templateUrl: './purchase-coupon.component.html',
  styleUrls: ['./purchase-coupon.component.css']
})
export class PurchaseCouponComponent implements OnInit {
  customer: Customer;
  coupons: Coupon[] = [];
  coupon: Coupon = new Coupon();
  purchasedCoupons: Coupon[] = [];
  priceToSort: number;
  typeToSort: CouponType;
  showOption: string;
  purchasedAlready: boolean = false;
  loadingCoupons: boolean = true;

  constructor(private service: CustomerserviceService, private logger: LoggerService) { }

  ngOnInit() {
    this.service.getUserName().subscribe(
      (customer) => { this.customer = new Customer(customer) },
      (error) => { console.log('something went wrong...') }
    );

    this.getAllCoupons();
    this.showOption = 'gallery';
    this.getAllPurchasedCoupons()
  }

  setCoupon(coupon: Coupon) {
    var self = this;
    self.purchasedAlready = false;
    self.coupon = new Coupon(coupon);
    for (var i = 0; i < self.purchasedCoupons.length; i++) {
      if (self.purchasedCoupons[i].getTitle === coupon.getTitle) {
        self.purchasedAlready = true;
        break;
      }
    }
  }

  purchaseCoupon() {
    this.service.purchaseCoupon(this.coupon).subscribe(
      (success) => {
        swal("Congrats!", "Coupon Purchased Succsessfully", "success");
        this.getAllPurchasedCoupons();
        this.logger.info("coupon: '" + this.coupon.getTitle + "' purchased by customer: '" + this.customer.getName + "'");
      },
      (error) => {
        swal("Oh no!", "an error occured while trying to purchase coupon..", "error");
        this.logger.error("customer: '" + this.customer.getName + "' failed to purchase coupon: '" + this.coupon.getTitle + "'")
      }
    );
  }

  getAllCoupons() {
    this.loadingCoupons = true;
    var self = this;
    self.service.getAllCoupons().subscribe(
      (copuons) => {
        this.coupons = [];
        for (let coupon of copuons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false
      },
      (error) => { console.log('something went wrong...') }
    );
  }

  getCouponsByType() {
    this.loadingCoupons = true;
    var self = this;
    self.service.getCouponsByType(self.typeToSort).subscribe(
      (copuons) => {
        this.coupons = [];
        for (let coupon of copuons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false;
      },
      (error) => { console.log('something went wrong...') }
    );
  }

  getCouponsByPrice() {
    this.loadingCoupons = true;
    var self = this;
    self.service.getCouponsByPrice(self.priceToSort).subscribe(
      (copuons) => {
        this.coupons = [];
        for (let coupon of copuons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false;
      },
      (error) => { console.log('something went wrong...') }
    );
  }

  changeShow(optionSelected: string) {
    var self = this;
    self.showOption = optionSelected;
  }

  getAllPurchasedCoupons() {
    this.service.getAllPurchasedCoupons().subscribe(
      (copuons) => {
        this.purchasedCoupons = [];
        for (let coupon of copuons) {
          coupon = new Coupon(coupon);
          this.purchasedCoupons.push(coupon);
        }
      },
      (error) => {
        console.log('something went wrong...')
      }
    )
  }
}
