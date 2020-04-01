import {StockRepository} from "./stock.repository";
import {Product} from "../models/products";

export class StockService {
  constructor(private stockRepo: StockRepository) {
  }

  createStock(product: Product,id: string): Promise<any> {
    return this.stockRepo.stockCreate(product,id);
  }

  decreaseStockCount(difference: number, productAfter: Product,id:string): Promise<any> {
    return this.stockRepo.decreaseStockCount(difference,productAfter,id);
  }

  updateProductInStock(product:Product ,id: string): Promise<any> {
    return this.stockRepo.updateProductInStock(product,id);
  }

  deleteStock(id: string): Promise<any>{
   return this.stockRepo.deleteStock(id);
  }
}
