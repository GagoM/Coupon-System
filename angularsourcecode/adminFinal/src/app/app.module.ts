import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, Location, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { CreateNewCompanyComponent } from './create-new-company/create-new-company.component';
import { EditCompaniesComponent } from './edit-companies/edit-companies.component';
import { AddNewCustomerComponent } from './add-new-customer/add-new-customer.component';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';
import { GetCompanyComponent } from './get-company/get-company.component';
import { GetCustomerComponent } from './get-customer/get-customer.component';
import { AdminserviceService } from './services/adminservice.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AuthGuardServiceService } from './services/auth-guard-service.service';
import { LoggerService } from './services/logger.service';
import { FooterComponent } from './footer/footer.component';

const appRoutes: Routes = [
  { path: '', redirectTo: "/admin-home", pathMatch: "full" },
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuardServiceService] },
  { path: 'create-new-company', component: CreateNewCompanyComponent, canActivate: [AuthGuardServiceService] },
  { path: 'edit-companies', component: EditCompaniesComponent, canActivate: [AuthGuardServiceService] },
  { path: 'create-new-customer', component: AddNewCustomerComponent, canActivate: [AuthGuardServiceService] },
  { path: 'edit-customers', component: EditCustomersComponent, canActivate: [AuthGuardServiceService] },
  { path: 'get-company', component: GetCompanyComponent, canActivate: [AuthGuardServiceService] },
  { path: 'get-customer', component: GetCustomerComponent, canActivate: [AuthGuardServiceService] },

];
@NgModule({
  declarations: [

    AppComponent,
    CreateNewCompanyComponent,
    EditCompaniesComponent,
    AddNewCustomerComponent,
    EditCustomersComponent,
    GetCompanyComponent,
    GetCustomerComponent,
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
  providers: [AdminserviceService, AuthGuardServiceService, LoggerService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
