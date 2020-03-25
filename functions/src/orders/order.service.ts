import {OrderRepository} from "./order.repository";

export class OrderService {
  constructor(private productRepository: OrderRepository) {}

  doSth(s1: string) {
    this.productRepository.doSth('x');
  }
}
