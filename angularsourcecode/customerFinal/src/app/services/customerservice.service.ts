import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Coupon } from '../models/Coupon.model';
import 'rxjs/Rx';
@Injectable()
export class CustomerserviceService {
  url:string='.';
  constructor(private _http: Http) { }

  private handleError(error: Response) {
    return Observable.throw(error);
}
  purchaseCoupon(coupon:Coupon){
    var self = this;
    return this._http.post(this.url+'/purchasecoupon',coupon)
    .catch(this.handleError);    
  }

  getAllPurchasedCoupons(){
    var self = this;
    return this._http.get(this.url+'/getallpurchasedcoupons')
   .map((res) => res.json()) 
   .catch(this.handleError);   
  }
  getAllPurchasedCouponsByType(type:CouponType){
    var self = this;
    return this._http.get(this.url+'/getallpurchasedcouponsbytype/'+type)
   .map((res) => res.json())
   .catch(this.handleError);
  }

  getAllPurchasedCouponsByPrice(price:number){
    var self = this;
    return this._http.get(this.url+'/getallpurchasedcouponsbyprice/'+price)
   .map((res) => res.json())
   .catch(this.handleError);
  }
  getAllCoupons(){
    var self = this;
   return self._http.get(this.url+'/getallcouponforcustomer')
   .map((res) => res.json())
   .catch(this.handleError);
  }

  getCouponsByType(couponType:CouponType){
    var self = this;
    return this._http.get(this.url+'/getallcouponsbytypeforcustomer/'+couponType)
  .map((res) => res.json())
  .catch(this.handleError);
   }

   getCouponsByPrice(price:number){
    var self = this;
    return this._http.get(this.url+'/getallcouponsbypriceforcustomer/'+price)
  .map((res) => res.json())
  .catch(this.handleError);
   }
   getUserName(){
  
    var self = this;
    return self._http.get(this.url+'/getcustomerusername')
  .map((res) => res.json())
  .catch(this.handleError);
   }
   logout(){
    var self = this;
    return self._http.get(this.url+'/customerlogout')
  .map((res) => res.json())
  .catch(this.handleError);
   }

   loginCheck():Observable<boolean>{
   return this._http.get('../././auth/customerlogincheck')
    .map((res) => res.json())
  .share()
  .catch(this.handleError);
   }

}
