import { Component, OnInit } from '@angular/core';
import { Coupon } from '../models/Coupon.model';
import { CompanyserviceService } from '../services/companyservice.service';
import swal from 'sweetalert';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import { Company } from '../models/Company.model';
import { LoggerService } from '../services/logger.service';

@Component({
  selector: 'app-create-new-coupon',
  templateUrl: './create-new-coupon.component.html',
  styleUrls: ['./create-new-coupon.component.css']
})
export class CreateNewCouponComponent implements OnInit {
  newCouponForm: FormGroup;
  c: Coupon = new Coupon();
  coupons: Coupon[] = [];
  today = new Date().toJSON().split('T')[0];
  minExp = new Date();
  company: Company;

  constructor(private service: CompanyserviceService, private logger: LoggerService) {

  }

  ngOnInit() {
    this.service.getUserName().subscribe(company => this.company = new Company(company));
    this.getAllExistingCoupons();

    this.newCouponForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, this.uniqueNameValidator.bind(this)]),
      'startDate': new FormControl(null, [Validators.required, this.startDateValidator.bind(this)]),
      'endDate': new FormControl(null, [Validators.required, this.endDateValidator.bind(this)]),
      'price': new FormControl(null, [Validators.required, Validators.min(1)]),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'type': new FormControl(null, Validators.required),
      'message': new FormControl(null, Validators.required),
      'image': new FormControl(null, Validators.required)

    })

  }

  createCoupon() {
    this.service.createCoupon(this.c).subscribe(
      (res) => {
        this.logger.info("coupon: '" + this.c.getTitle + "' created by company: '" + this.company.getName + "'")
        swal("Success!", "Coupon Created Succsessfully!", "success");
        this.newCouponForm.reset();
        this.getAllExistingCoupons();
      },
      (error) => {
        swal("Oh no!", "system wasn't able to add the coupon", "error"),
          this.logger.error("company: '" + this.company.getName + "' failed to create coupon: '" + this.c.getTitle + "'")
      }
    )
  }

  getAllExistingCoupons() {
    this.service.getAllExistingCoupons().subscribe(
      (coupons) => {
        for (let coupon of coupons) {
          coupon = new Coupon(coupon);
          this.coupons.push(coupon);
        }
      },
      (error) => { console.log('something went wrong..') }
    )
  }

  uniqueNameValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;

    var exist = false;
    for (var i = 0; i < self.coupons.length; i++) {
      if (self.coupons[i].getTitle === control.value) {
        exist = true;
        break;
      }
    }
    if (exist === true) {
      return { 'nameIsAlreadyTaken': true };
    }
    return null;

  }
  startDateValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;
    if (self.today > control.value) {
      return { 'DateIsNotValid': true };
    }

    return null;

  }

  endDateValidator(control: FormControl): { [message: string]: boolean } {
    var self = this;
    if (self.minExp >= control.value) {
      return { 'DateIsNotValid': true };
    }

    return null;

  }
}
