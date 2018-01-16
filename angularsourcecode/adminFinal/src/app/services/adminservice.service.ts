import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Company } from '../models/company.model';
import { Customer } from '../models/customer.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share'
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/throw'
@Injectable()
export class AdminserviceService {
  private url: string = ".";
  constructor(private _http: Http) { }

  private handleError(error: Response) {
    return Observable.throw(error);
  }

  getCompany(compId: number) {
    var self = this;
    return this._http.get(this.url + '/readcompany/' + compId)
      .map((res) => res.json())
      .catch(this.handleError);
  }

  getCompanies() {
    var self = this;
    return this._http.get(this.url + '/readallcompanies')
      .map((res) => res.json())
      .catch(this.handleError);
  }
  createCompany(company: Company) {
    var self = this;
    return self._http.post(this.url + "/createcompany", company)
      .catch(this.handleError);

  }
  updateCompany(company: Company) {
    var self = this;
    return self._http.put(this.url + "/updatecompany", company)
      .catch(this.handleError);
  }
  deleteCompany(company: Company) {
    var self = this;
    return self._http.delete(this.url + "/removecompany", { body: company })
      .catch(this.handleError);
  }

  getCustomer(id: number) {
    var self = this;
    return this._http.get(this.url + "/readcustomer/" + id)
      .map((res) => res.json())
      .catch(this.handleError);
  }
  getAllCustomers() {
    var self = this;
    return this._http.get(this.url + '/readallcustomer')
      .map((res) => res.json())
      .catch(this.handleError);
  }
  createCustomer(customer: Customer) {
    var self = this;
    return self._http.post(this.url + "/createcustomer", customer)
      .catch(this.handleError);
  }


  updateCustomer(customer: Customer) {
    var self = this;
    return self._http.put(this.url + "/updatecustomer", customer)
      .catch(this.handleError);
  }
  deleteCustomer(customer: Customer) {
    var self = this;
    return self._http.delete(this.url + "/removecustomer", { body: customer })
      .catch(this.handleError);
  }
  logout() {
    var self = this;
    return self._http.get(this.url + '/adminlogout')
      .map((res) => res.json())
      .catch(this.handleError);
  }
  loginCheck(): Observable<boolean> {
    var self = this;
    return self._http.get('../././auth/adminlogincheck')
      .map((res) => res.json())
      .share()
      .catch(this.handleError);
  }

}
