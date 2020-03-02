import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import {Product} from '../shared/product';
import {Router} from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  constructor(private prodService: ProductService, private router: Router) { }

  ngOnInit() {
  this.prodService.getProducts().subscribe( products => {
      this.products = products;
    }
  );
  }

  edit(product: Product) {
    this.router.navigateByUrl('update-product/' + product.id);
  }

  remove(id: string) {
    this.prodService.delete(id);
  }
}
