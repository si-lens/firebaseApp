import {StockRepository} from "./stock.repository";
import {Product} from "../models/products";

export class StockService {
  constructor(private stockRepo: StockRepository) {
  }
  stockProductCreate(product: Product): Promise<any>{
    return this.stockRepo.stockProductCreate(product);
  }

  decreaseStockCount(difference: number, product: Product):Promise<any> {
    return this.stockRepo.decreaseStockCount(difference,product);
  }

  updateProductInStock(product: Product) {
    return this.stockRepo.updateProductInStock(product);
  }
}
