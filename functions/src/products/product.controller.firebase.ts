import {ProductController} from './product.controller';
import {ProductService} from './product.service';


export class ProductControllerFirebase implements ProductController {
  constructor(private prodService: ProductService) {
  }
  doSth(s: string): any {
    this.prodService.doSth('1');
    return null;
  }

}
