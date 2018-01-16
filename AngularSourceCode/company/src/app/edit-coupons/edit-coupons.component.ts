import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/Coupon.model';
import { CompanyserviceService } from '../services/companyservice.service';
import { LoggerService } from '../services/logger.service';
import { Company } from '../models/Company.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
@Component({
  selector: 'app-edit-coupons',
  templateUrl: './edit-coupons.component.html',
  styleUrls: ['./edit-coupons.component.css']
})
export class EditCouponsComponent implements OnInit {

  loadingCoupons = true;
  company: Company;
  coupons: Coupon[] = [];
  coupon: Coupon = new Coupon();
  couponToUpdate = new Coupon();
  priceToSort: number = null;
  dateToSort: Date = null;
  typeToSort: CouponType = null;
  showOption: string = 'table';
  updateCouponForm: FormGroup;

  constructor(private service: CompanyserviceService, private logger: LoggerService) { }
  ngOnInit() {
    this.getAllCoupons();
    this.service.getUserName().subscribe(
      (company) => { this.company = new Company(company) },
      (error) => { console.error('something went wrong...') }
    );
    this.updateCouponForm = new FormGroup({
      'price': new FormControl(null, Validators.required),
      'expirationDate': new FormControl(null, Validators.required)
    })
  }

  setCoupon(coupon: Coupon) {
    this.coupon = new Coupon(coupon);
  }

  updateCoupon() {
    this.loadingCoupons = true;
    var self = this;
    self.service.updateCoupon(self.coupon).subscribe(
      (res) => {
        swal("Success!", "Coupon Updated Succsessfully", "success");
        this.logger.info("coupon: '" + this.coupon.getTitle + "' updated by company: '" + self.company.getName + "'")
        this.getAllCoupons();
      },
      (error) => {
        swal("Error in updating coupon..", "error");
        this.logger.error("company: '" + this.company.getName + "' failed to update coupon: '" + this.coupon.getTitle + "'")
      }
    );

  }
  deleteCoupon() {
    this.loadingCoupons = true;
    var self = this;
    self.service.deleteCoupon(self.coupon).subscribe(
      (res) => {
        swal("That coupon has gone forever.", "Coupon deleted succsessfully", "success");
        this.logger.info("coupon: '" + this.coupon.getTitle + "' deleted by company: '" + self.company.getName + "'")
        this.getAllCoupons();
      },
      (error) => {
        swal("Failure!", "Error in deleting coupon..", "error");
        this.logger.error("company: '" + this.company.getName + "' failed to delete coupon: '" + this.coupon.getTitle + "'")
      }

    );


  }
  getCouponsByPrice() {
    this.loadingCoupons = true;
    var self = this;
    self.service.getCouponsByPrice(self.priceToSort).subscribe(
      (coupons) => {
        this.coupons = [];
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false;
      },
      (error) => { console.error('something went wrong...') }

    );
  }
  getCouponsByType() {
    this.loadingCoupons = true;
    var self = this;
    self.service.getCouponsByType(self.typeToSort).subscribe(
      (coupons) => {
        this.coupons = [];
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false;
      },
      (error) => { console.error('something went wrong...') }
    );
  }
  getCouponsByDate() {
    var self = this;
    this.loadingCoupons = true;
    self.service.getCouponsByDate(self.dateToSort).subscribe(
      (coupons) => {
        this.coupons = [];
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false;
      },
      (error) => { console.error('something went wrong...') }
    );

  }

  getAllCoupons() {
    var self = this;
    this.loadingCoupons = true;
    self.service.getAllCoupons().subscribe(
      (coupons) => {
        this.coupons = [];
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
        this.loadingCoupons = false;
      },
      (error) => { console.error('something went wrong...') }
    );
  }

  changeShow(optionSelected: string) {
    var self = this;
    self.showOption = optionSelected;
  }
}
