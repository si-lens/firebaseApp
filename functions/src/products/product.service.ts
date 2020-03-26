import {ProductRepository} from "./product.repository";
import {Product} from "../models/products";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  updateProduct(product: Product): Promise<any> {
    return this.productRepository.updateProduct(product);
  }
}
