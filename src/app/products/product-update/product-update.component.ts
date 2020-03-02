import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../shared/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../shared/product';
import {AlertService} from '../../shared/alert-service.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  productForm  = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    available: new FormControl('')
  });
  product: Product;
  id: string;
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(this.id).subscribe( product => {
      this.product = product;
      console.log('hehehe' + this.product.name);
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        available: product.available,
      });
    });
  }

  save() {
  const formValues = this.productForm.value;
  this.product.price = formValues.price;
  this.product.available = formValues.available;
  this.product.name = formValues.name;
  this.productService.update(this.product, this.id).then( () => {
    this.alertService.successMessageShow('Product was updated.');
    this.router.navigateByUrl('profile');
  });
  }
}
