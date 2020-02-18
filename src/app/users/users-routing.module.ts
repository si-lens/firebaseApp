import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {ProfileComponent} from './profile/profile.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from '../shared/auth.guard';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
