import {ProductController} from './product.controller';
import {ProductService} from './product.service';

export class ProductControllerFirebase implements ProductController {

  constructor(private productService: ProductService) {}
  productCreated(productID: string): Promise<any> {
    //const product = snapshot.data() as Product;
    return this.productService.createStockProduct(productID);
  }

  productWritten(productID: string): Promise<any> {
    return this.productService.createStockProduct(productID);
  }

}
