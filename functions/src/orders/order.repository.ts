import {Product} from "../models/products";


export interface OrderRepository {
  createOrder(product: Product, timesPurchased: number): Promise<any>;

  updateProductInOrder(product: Product): Promise<any>;
}
