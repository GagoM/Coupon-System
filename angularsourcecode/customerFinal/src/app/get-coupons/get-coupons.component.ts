import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/Coupon.model';
import { CustomerserviceService } from '../services/customerservice.service';

@Component({
  selector: 'app-get-coupons',
  templateUrl: './get-coupons.component.html',
  styleUrls: ['./get-coupons.component.css']
})
export class GetCouponsComponent implements OnInit {
  coupons: Coupon[] = [];
  coupon: Coupon = new Coupon();
  showOption: string = 'table';
  priceToSort: number = null;
  typeToSort: CouponType = null;
  loadingCoupons: boolean = true;

  constructor(private service: CustomerserviceService) { }

  ngOnInit() {
    this.getAllPurchasedCoupons();
  }

  setCoupon(coupon: Coupon) {
    var self = this;
    self.coupon = new Coupon(coupon);
  }

  changeShow(optionSelected: string) {
    var self = this;
    self.showOption = optionSelected;
  }

  getAllPurchasedCoupons() {
    this.loadingCoupons = true;
    this.coupons = [];
    this.service.getAllPurchasedCoupons().subscribe(
      (coupons) => {
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false
      },
      (error) => { console.log('something went wrong...') }
    );

  }
  getAllPurchasedCouponsByType() {
    var self = this;
    this.loadingCoupons = true;
    self.service.getAllPurchasedCouponsByType(self.typeToSort).subscribe(
      (coupons) => {
        this.coupons = [];
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false
      },
      (error) => { console.log('something went wrong...') }
    );
  }

  getAllPurchasedCouponsByPrice() {
    var self = this;
    this.loadingCoupons = true;
    self.service.getAllPurchasedCouponsByPrice(self.priceToSort).subscribe(
      (coupons) => {
        this.coupons = [];
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false
      },
      (error) => { console.log('something went wrong...') }
    );
  }
}
