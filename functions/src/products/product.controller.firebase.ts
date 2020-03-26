import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {Change} from 'firebase-functions/lib/cloud-functions';
import {DocumentSnapshot} from 'firebase-functions/lib/providers/firestore';
import {EventContext} from 'firebase-functions';
import {Product} from "../models/products";

export class ProductControllerFirebase implements ProductController {
  constructor(private prodService: ProductService) {
  }

  updateProduct(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const prodBefore = change.before.data() as Product;
    const prodAfter = change.before.data() as Product;
    //If product was simply edited not bought this will be executed
    if(prodBefore.timesPurchased === prodAfter.timesPurchased) {
      return this.prodService.updateProduct(prodAfter)
    } else {
      return Promise.resolve();
    }
  }


}
