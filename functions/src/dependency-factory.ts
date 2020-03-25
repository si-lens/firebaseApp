import {ProductController} from './products/product.controller';
import {ProductControllerFirebase} from './products/product.controller.firebase';
import {ProductRepositoryFirebase} from './products/product.repository.firebase';
import {ProductRepository} from './products/product.repository';
import {ProductService} from './products/product.service';
import {StockController} from "./stock/stock.controller";
import {StockRepository} from "./stock/stock.repository";
import {StockService} from "./stock/stock.service";
import {StockControllerFirebase} from "./stock/stock.controller.firebase";
import {StockRepositoryFirebase} from "./stock/stock.repository.firebase";
import {OrderController} from "./orders/order.controller";
import {OrderControllerFirebase} from "./orders/order.controller.firebase";
import {OrderService} from "./orders/order.service";
import {OrderRepositoryFirebase} from "./orders/order.repository.firebase";

export class DependencyFactory {
  getProductController(): ProductController {
    const repo: ProductRepository = new ProductRepositoryFirebase();
    const service: ProductService = new ProductService(repo);
    return new ProductControllerFirebase(service)
  }
  getStockController(): StockController {
    const repo: StockRepository = new StockRepositoryFirebase();
    const service: StockService = new StockService(repo);
    return new StockControllerFirebase(service);
  }
  getOrderController(): OrderController {
    const orderRepo = new OrderRepositoryFirebase();
    const orderService = new OrderService(orderRepo);
    return new OrderControllerFirebase(orderService)
  }

}
//const prodBefore = change.before.data() as Product;
//     const prodAfter = change.after.data() as Product;
//     if(prodAfter.timesPurchased > prodBefore.timesPurchased) {
//       return this.prodService.
//     }
