import {Product} from "../models/products";


export interface ProductRepository {
  updateProduct(product: Product): Promise<any>;
}
