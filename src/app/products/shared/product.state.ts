import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {CreateProduct} from './product.actions';
import {Product} from '../../shared/models/product';

export class ProductStateModel {
  products: Product[];
  lastCreated: Product;
}

@State<ProductStateModel>({
  name: 'all',
  defaults: {
    products: undefined,
    lastCreated: undefined
  }
})

@Injectable()
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  static getProducts(state: ProductStateModel) {
  return state.products;
  }



  @Action(CreateProduct)
  createProduct(ctx: StateContext<ProductStateModel>, action: CreateProduct) {
    return this.productService.create(action.product)
      .pipe(tap((result) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          lastCreated: result
        });
      }));
  }
  @Action(CreateProduct)
  getProducts(ctx: StateContext<ProductStateModel>) {
    return this.productService.getProducts()
      .pipe(tap((result) => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          products: result
        });
      }));
  }


}
