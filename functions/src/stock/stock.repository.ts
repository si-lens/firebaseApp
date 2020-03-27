import {Product} from "../models/products";

export interface StockRepository {
  stockProductCreate(product: Product):Promise<any>;

  decreaseStockCount(difference: number, productID: string): Promise<any>;

  updateProductInStock(product: Product): Promise<any>;
}
