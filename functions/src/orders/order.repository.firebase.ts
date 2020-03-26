import * as admin from 'firebase-admin';
import {OrderRepository} from './order.repository';
import {Product} from "../models/products";
import {Order_line} from "../models/order_line";

export class OrderRepositoryFirebase implements OrderRepository {
  topProductsPath = 'top-products';

  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  createOrder(product: Product, timesPurchased: number): Promise<any> {
    const order_lines: Order_line[] = [];
    const order_line: Order_line = {count: timesPurchased, productBought: product};
    order_lines.push(order_line);

    return this.db().collection('orders').add({
      order_lines: order_lines
    });
  }
}
