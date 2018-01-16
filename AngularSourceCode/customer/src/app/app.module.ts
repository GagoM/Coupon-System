import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

import { AppComponent } from './app.component';
import { CustomerserviceService } from './services/customerservice.service';
import { PurchaseCouponComponent } from './purchase-coupon/purchase-coupon.component';
import { GetCouponsComponent } from './get-coupons/get-coupons.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';
import { LoggerService } from './services/logger.service';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: "/customer-home", pathMatch:"full"},
  { path: 'customer-home', component: CustomerHomeComponent,canActivate: [AuthGuardServiceService]},
  { path: 'purchase-coupon', component: PurchaseCouponComponent,canActivate: [AuthGuardServiceService]},
  { path: 'get-coupons', component: GetCouponsComponent,canActivate: [AuthGuardServiceService]},
];
@NgModule({
  declarations: [
    GetCouponsComponent,
    PurchaseCouponComponent,
    AppComponent,
    CustomerHomeComponent,
    NavigatorComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CustomerserviceService,AuthGuardServiceService,LoggerService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
