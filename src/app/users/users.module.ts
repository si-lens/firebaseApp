import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ProductsModule} from '../products/products.module';
import {ProductListComponent} from '../products/product-list/product-list.component';


@NgModule({
  declarations: [
    ProfileComponent,
    NewAccountComponent,
    LoginComponent,
    AdminComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ProductListComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        ReactiveFormsModule,
        ProductsModule
    ],
  providers: []
})
export class UsersModule { }
