import {ProductRepository} from "./product.repository";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}
/*
  writeProduct(
    prodId: string,
    productBefore: Product,
    productAfter: Product
  ): Promise<void> {

  }
*/

  createStockProduct(productID: string): Promise<any> {
    return this.productRepository.createStockProduct(productID);
  }
}
