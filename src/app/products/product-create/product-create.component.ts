import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../shared/models/product';
import {ProductService} from '../shared/product.service';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {Store} from '@ngxs/store';
import {CreateProduct} from '../shared/product.actions';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {price: 0, available: 'false', name: 'none'};
  productForm = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    available: new FormControl('')
  });

  constructor(private prodService: ProductService,
              private router: Router,
              private alertSerivce: AlertService,
              private store: Store) {
  }

  ngOnInit() {
  }

  save() {
    const formValues = this.productForm.value;
    this.product.name = formValues.name;
    this.product.price = formValues.price;
    this.product.available = formValues.available;
    this.store.dispatch(new CreateProduct(this.product)).toPromise().then(() =>
      this.alertSerivce.successMessageShow('Products created: ' + this.product.name)
    ).catch(() =>
      this.alertSerivce.errorMessageShow('Something went wrong')
    ).finally(() => this.router.navigateByUrl('profile'));
  }
}
