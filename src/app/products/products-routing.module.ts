import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductUpdateComponent} from './product-update/product-update.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductsModule} from './products.module';
import {ProductCreateComponent} from './product-create/product-create.component';



const routes: Routes = [
   {
     path: 'update-product/:id',
     component: ProductUpdateComponent
   },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'create-product',
    component: ProductCreateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
