import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from '../shared/auth.guard';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {ProductCreateComponent} from "../products/product-create/product-create.component";
import {ProductUpdateComponent} from "../products/product-update/product-update.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'newAccount',
    component: NewAccountComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'admin', canActivate: [AuthGuard],
    component: AdminComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  },
  {
    path: 'change',
    component: ChangePasswordComponent
  },
  { path: 'create-product',
    component: ProductCreateComponent
  },
  {
    path: 'update-product/:id',
    component: ProductUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
