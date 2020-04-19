import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../shared/models/product';
import {AlertService} from '../../shared/alert-service.service';
import {Select, Store} from '@ngxs/store';
import {UpdateProduct} from '../shared/product.actions';
import {ProductState} from '../shared/product.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  @Select(ProductState.getProducts) products: Observable<Product[]>;
  initialProductData: Product = undefined;
  productForm  = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    available: new FormControl('')
  });
  id: string;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router,
              private store: Store
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.products.subscribe(products => {
        this.initialProductData = products.find(pr => pr.id === this.id);
        this.productForm.patchValue({
        name: this.initialProductData.name,
        price: this.initialProductData.price,
        available: this.initialProductData.available,
      });
      }
    );
  }

  save() {
  const formValues = this.productForm.value;
  const product: Product = {
    id: this.id,
    timesPurchased: this.initialProductData.timesPurchased,
    name: formValues.name,
    price: formValues.price,
    available: formValues.available
  };

  this.store.dispatch(new UpdateProduct(product, this.id)).toPromise().then( () => {
    this.alertService.successMessageShow('Product was updated.');
    this.router.navigateByUrl('profile');
  });
  }
}
