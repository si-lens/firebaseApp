import {ProductRepository} from "./product.repository";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  doSth(s1: string) {
    this.productRepository.doSth('x');
  }
}
