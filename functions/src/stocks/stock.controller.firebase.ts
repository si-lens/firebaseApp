import {StockController} from "./stock.controller";
import {StockService} from "./stock.service";
import {Product} from "../models/products";
import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

export class StockControllerFirebase implements StockController{
  constructor(private stockService: StockService) {
  }
  createStock(product: Product, context: EventContext): Promise<any> {
   return this.stockService.createStock(product,context.params.id);
  }

  updateStock(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const productBefore = change.before.data() as Product;
    const productAfter = change.after.data() as Product;
      //difference means how many times the product was bought
      const difference = productAfter.timesPurchased - productBefore.timesPurchased;
      const id = context.params.id;
      if (difference > 0) {
        //When product is bought, stocks amount is decreased
        return this.stockService.decreaseStockCount(difference, productAfter,id);
      } else {
        //When product is edited, it's edited in the stocks as well
        return this.stockService.updateProductInStock(productAfter,id);
      }
  }

  deleteStock(context: EventContext): Promise<any> {
   return this.stockService.deleteStock(context.params.id);
  }

}
