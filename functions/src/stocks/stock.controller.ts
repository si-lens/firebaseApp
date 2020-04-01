import {Product} from "../models/products";
import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

export interface StockController {
  createStock(product: Product, context: EventContext): Promise<any>;

  updateStock(change: Change<DocumentSnapshot>, context: EventContext): Promise<any>;

  deleteStock(context: EventContext):  Promise<any>;
}
