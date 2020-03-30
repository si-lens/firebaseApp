import {StockController} from "./stock.controller";
import {StockService} from "./stock.service";
import {Product} from "../models/products";
import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

export class StockControllerFirebase implements StockController{
  constructor(private stockService: StockService) {
  }
  createStock(product: Product): Promise<any> {
   return this.stockService.createStock(product);
  }

  updateStock(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const productBefore = change.before.data() as Product;
    const productAfter = change.after.data() as Product;
    return this.stockService.updateStock(productBefore,productAfter);
  }

}
