import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {Change} from "firebase-functions/lib/cloud-functions";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {EventContext} from "firebase-functions";
import {Product} from "../models/products";

export class OrderControllerFirebase implements OrderController {
  constructor(private orderService: OrderService) {
  }
  updateOrder(change: Change<DocumentSnapshot>, context: EventContext): Promise<any> {
    const productAfter = change.after.data() as Product;
    const productBefore = change.before.data() as Product;
   return this.orderService.updateOrder(productBefore,productAfter);
  }
}
