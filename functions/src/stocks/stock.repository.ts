import {Product} from "../models/products";

export interface StockRepository {
  stockCreate(product: Product):Promise<any>;

  decreaseStockCount(difference: number, product: Product): Promise<any>;

  updateProductInStock(product: Product): Promise<any>;

  deleteStock(id: string): Promise<any>;
}
