import {StockRepository} from "./stock.repository";
import {Product} from "../models/products";

export class StockService {
  constructor(private stockRepo: StockRepository) {
  }
  createStock(product: Product): Promise<any>{
    return this.stockRepo.stockCreate(product);
  }
  updateStock(productBefore: Product, productAfter: Product) {
    const difference = productAfter.timesPurchased - productBefore.timesPurchased;
    //difference means how many times the product was bought
    if(difference>0) {
      //When product is bought, stocks amount is decreased
      return this.stockRepo.decreaseStockCount(difference, productAfter);
    } else {
      //When product is edited, it's edited in the stocks as well
      return this.stockRepo.updateProductInStock(productAfter);
    }
  }
}
