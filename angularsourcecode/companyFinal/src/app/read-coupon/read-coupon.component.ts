import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/Coupon.model';
import { CompanyserviceService } from '../services/companyservice.service';

@Component({
  selector: 'app-read-coupon',
  templateUrl: './read-coupon.component.html',
  styleUrls: ['./read-coupon.component.css']
})
export class ReadCouponComponent implements OnInit {

  getError: boolean = false;
  showCoupon: boolean = false;
  couponId: number = 0;
  coupon: Coupon = new Coupon();
  constructor(private service: CompanyserviceService) {
  }
  ngOnInit() {

  }
  getCoupon() {
    this.getError = false;
    this.showCoupon = true;
    this.service.getCoupon(this.couponId).subscribe(
      (coupon) => {
        this.coupon = new Coupon(coupon);
        if (this.coupon.getTitle === null) {
          this.getError = true;
        }
      },
      (error) => { this.getError = true; console.error('something went wrong...') }
    );
  }

}
