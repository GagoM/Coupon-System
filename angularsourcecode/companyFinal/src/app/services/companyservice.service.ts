import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Coupon } from '../models/Coupon.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { RequestOptions } from '@angular/http/src/base_request_options';
import { Company } from '../models/Company.model';
import 'rxjs/Rx';
@Injectable()
export class CompanyserviceService {
  url: string = ".";
  constructor(private _http: Http) { }

  private handleError(error: Response) {
    return Observable.throw(error);
  }
  createCoupon(coupon: Coupon) {
    var self = this;
    return self._http.post(this.url + "/createcoupon", coupon)
      .catch(this.handleError).catch(this.handleError)
  }

  deleteCoupon(coupon: Coupon) {
    var self = this;
    return self._http.delete(this.url + "/removecoupon", { body: coupon })
      .catch(this.handleError)
  }
  updateCoupon(coupon: Coupon) {
    var self = this;
    return self._http.put(this.url + '/updatecoupon', coupon)
      .catch(this.handleError)
  }
  getCoupon(id: number) {
    var self = this;
    return this._http.get(this.url + "/readcoupon/" + id)
      .map((res) => res.json())
      .catch(this.handleError)
  }

  getAllCoupons() {
    var self = this;
    return self._http.get(this.url + '/getallcoupon')
      .map((res) => res.json())
      .catch(this.handleError)
  }

  getCouponsByType(couponType: CouponType) {
    var self = this;
    return self._http.get(this.url + '/getcouponsbytype/' + couponType)
      .map((res) => res.json())
      .catch(this.handleError)
  }

  getCouponsByPrice(price: number) {
    var self = this;
    return self._http.get(this.url + '/getcouponsbyprice/' + price)
      .map((res) => res.json())
      .catch(this.handleError)
  }

  getCouponsByDate(date: Date) {
    var self = this;
    return self._http.get(this.url + '/getcouponsbydate/' + date)
      .map((res) => res.json())
      .catch(this.handleError)
  }
  getUserName() {
    var self = this;
    return self._http.get(this.url + '/getcompanyusername')
      .map((res) => res.json())
      .catch(this.handleError)
  }
  getAllExistingCoupons() {
    var self = this;
    return self._http.get(this.url + '/getallexistingcoupons')
      .map((res) => res.json())
      .catch(this.handleError)
  }
  logout() {
    var self = this;
    return self._http.get(this.url + '/companylogout')
      .map((res) => res.json())
      .catch(this.handleError)
  }
  loginCheck(): Observable<boolean> {
    var self = this;
    return self._http.get('../././auth/companylogincheck')
      .map((res) => res.json())
      .share()
      .catch(this.handleError)
  }
}
