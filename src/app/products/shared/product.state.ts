import {Action, Selector, State, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ProductService} from './product.service';
import {CreateProduct, DeleteProduct, GetProducts, UpdateProduct} from './product.actions';
import {Product} from '../../shared/models/product';

export class ProductStateModel {
  products: Product[];
}

@State<ProductStateModel>({
  name: 'all',
  defaults: {
    products: undefined
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
    return this.productService.create(action.product).then(() => {
      const state = ctx.getState();
      ctx.setState({
        ...state
      });
    });
  }
  @Action(GetProducts)
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
  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, action: DeleteProduct) {
    return this.productService.delete(action.id)
      .pipe(tap(() => {
        const state = ctx.getState();
        const filteredProducts = state.products.filter(product => product.id !== action.id);
        ctx.setState({
          ...state,
          products: filteredProducts
        });
      }));
  }
  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    return this.productService.update(action.p, action.id).then(() => {
      const state = ctx.getState();
      const productsUpdated = [...state.products];
      const productIndex = productsUpdated.findIndex(item => item.id === action.id);
      productsUpdated[productIndex] = action.p;
      ctx.setState({
        ...state,
        products: productsUpdated
      });
    });
  }


}
