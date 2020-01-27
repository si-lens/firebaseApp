import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'newAccount', component: NewAccountComponent},
  { path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
