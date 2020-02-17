import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
