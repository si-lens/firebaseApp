import {Product} from "../models/products";
import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';

export interface StockController {
  stockProductCreate(product: Product): Promise<any>;

  decreaseStockCount(change: Change<DocumentSnapshot>, context: EventContext): Promise<any>;
}
