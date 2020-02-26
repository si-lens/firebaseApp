import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './shared/auth.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'newAccount',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'profile',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'admin',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'reset',
    loadChildren: './users/users.module#UsersModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
