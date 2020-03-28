import {StockController} from "./stocks/stock.controller";
import {StockRepository} from "./stocks/stock.repository";
import {StockService} from "./stocks/stock.service";
import {StockControllerFirebase} from "./stocks/stock.controller.firebase";
import {StockRepositoryFirebase} from "./stocks/stock.repository.firebase";
import {OrderController} from "./orders/order.controller";
import {OrderControllerFirebase} from "./orders/order.controller.firebase";
import {OrderService} from "./orders/order.service";
import {OrderRepositoryFirebase} from "./orders/order.repository.firebase";

export class DependencyFactory {
  /*
  getProductController(): ProductController {
    const repo: ProductRepository = new ProductRepositoryFirebase();
    const service: ProductService = new ProductService(repo);
    return new ProductControllerFirebase(service)
  }*/
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
