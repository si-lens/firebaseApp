import {OrderRepository} from "./order.repository";
import {Product} from "../models/products";

export class OrderService {
  constructor(private productRepository: OrderRepository) {}
  createOrder(product: Product, timesPurchased: number) {
    return this.productRepository.createOrder(product,timesPurchased);
  }
}
