import {Product} from "../models/products";

export interface StockRepository {
  stockProductCreate(product: Product):Promise<any>;

  decreaseStockCount(difference: number, productID: any): Promise<any>;
}
