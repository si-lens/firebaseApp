import {StockRepository} from "./stock.repository";
import {Product} from "../models/products";

export class StockService {
  constructor(private stockRepo: StockRepository) {
  }

  createStock(product: Product): Promise<any> {
    return this.stockRepo.stockCreate(product);
  }

  decreaseStockCount(difference: number, productAfter: Product): Promise<any> {
    return this.stockRepo.decreaseStockCount(difference,productAfter);
  }

  updateProductInStock(productAfter: Product): Promise<any> {
    return this.stockRepo.updateProductInStock(productAfter);
  }

  deleteStock(id: string): Promise<any>{
   return this.stockRepo.deleteStock(id);
  }
}
