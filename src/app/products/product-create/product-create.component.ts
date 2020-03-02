import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../shared/product';
import {ProductService} from '../shared/product.service';
import {Router} from "@angular/router";
import {AlertService} from "../../shared/alert-service.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {price: 0, available: 'false', name: 'none'};
  productForm  = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    available: new FormControl('')
  });
  constructor(private prodService: ProductService, private router: Router, private alertSerivce: AlertService) { }

  ngOnInit() {
  }

  save() {
    const formValues = this.productForm.value;
    this.product.name = formValues.name;
    this.product.price = formValues.price;
    this.product.available = formValues.available;
    this.prodService.create(this.product).then( () =>
      this.router.navigateByUrl('profile')
    ).catch(error => this.alertSerivce.errorMessageShow('Something went wrong! Try again.'));
  }
}
