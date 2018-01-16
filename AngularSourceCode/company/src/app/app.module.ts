import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule }    from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Router, Routes} from '@angular/router';
import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';


import { AppComponent } from './app.component';
import { CreateNewCouponComponent } from './create-new-coupon/create-new-coupon.component';
import { EditCouponsComponent } from './edit-coupons/edit-coupons.component';
import { ReadCouponComponent } from './read-coupon/read-coupon.component';
import { CompanyserviceService } from './services/companyservice.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';
import { LoggerService } from './services/logger.service';
import { ROUTER_PROVIDERS } from '@angular/router/src/router_module';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: "/admin-home", pathMatch:"full"},
  { path: 'admin-home', component: AdminHomeComponent,canActivate: [AuthGuardServiceService]},
  { path: 'create-new-coupon', component: CreateNewCouponComponent,canActivate: [AuthGuardServiceService]},
  { path: 'edit-coupons', component: EditCouponsComponent,canActivate: [AuthGuardServiceService]},
  { path: 'read-coupon', component: ReadCouponComponent,canActivate: [AuthGuardServiceService]},
];
@NgModule({
  declarations: [
    AppComponent,
    CreateNewCouponComponent,
    EditCouponsComponent,
    ReadCouponComponent,
    AdminHomeComponent,
    NavigatorComponent,
    FooterComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CompanyserviceService, AuthGuardServiceService,LoggerService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {}
