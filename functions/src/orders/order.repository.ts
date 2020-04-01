import {Product} from "../models/products";


export interface OrderRepository {
  createOrder(product: Product, timesPurchased: number,id: string): Promise<any>;

  updateProductInOrders(product: Product,id:string): Promise<any>;
}
