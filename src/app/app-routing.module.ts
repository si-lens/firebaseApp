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
  },
  {
    path: 'change',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'create-product',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'update-product/:id',
    loadChildren: './products/products.module#ProductsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
