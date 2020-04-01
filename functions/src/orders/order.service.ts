import {OrderRepository} from "./order.repository";
import {Product} from "../models/products";

export class OrderService {
  constructor(private productRepository: OrderRepository) {}

  updateOrder(productBefore: Product, productAfter: Product,id: string) {
    const timesPurchased = productAfter.timesPurchased - productBefore.timesPurchased;
    if(timesPurchased>0) {
      //When product is bought, new order is created and added to the db
      return this.productRepository.createOrder(productAfter, timesPurchased,id);
    } else {
      // When product is edited, it will be updated in the order as well
      return this.productRepository.updateProductInOrders(productAfter,id);
    }
  }
}
