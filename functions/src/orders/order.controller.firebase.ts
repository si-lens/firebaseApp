import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {Change} from "firebase-functions/lib/cloud-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";
import {Product} from "../models/products";

export class OrderControllerFirebase implements OrderController {
  constructor(private orderService: OrderService) {
  }
  handleOrder(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const productAfter = change.after.data() as Product;
    const productBefore = change.before.data() as Product;
    const timesPurchased = productAfter.timesPurchased - productBefore.timesPurchased;
    if(timesPurchased>0) {
      //When product is bought, new order is created and added to the db
      return this.orderService.createOrder(productAfter, timesPurchased);
    } else {
      // When product is edited, it will be updated in the order as well
      return this.orderService.updateProductInOrder(productAfter);
    }
  }
}
