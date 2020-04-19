import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../../shared/models/product';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {DeleteProduct, GetProducts} from '../shared/product.actions';
import {Observable} from 'rxjs';
import {ProductState} from '../shared/product.state';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getProducts) products: Observable<Product[]>;
  constructor(private prodService: ProductService, private router: Router, private store: Store) { }

  ngOnInit() {
  this.store.dispatch(new GetProducts());
  }

  edit(product: Product) {
    this.router.navigateByUrl('update-product/' + product.id);
  }

  remove(id: string) {
    this.store.dispatch(new DeleteProduct(id));
    //this.prodService.delete(id);
  }
}
