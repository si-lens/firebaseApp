import {Product} from "../models/products";

export interface StockRepository {
  stockCreate(product: Product,id: string):Promise<any>;

  decreaseStockCount(difference: number, product: Product,id:string): Promise<any>;

  updateProductInStock(product: Product,id: string): Promise<any>;

  deleteStock(id: string): Promise<any>;
}
