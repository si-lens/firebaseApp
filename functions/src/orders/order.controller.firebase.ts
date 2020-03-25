import {OrderController} from './order.controller';
import {OrderService} from './order.service';

export class OrderControllerFirebase implements OrderController {
  constructor(private prodService: OrderService) {
  }
  doSth(s: string): any {
    this.prodService.doSth('1');
    return null;
  }
}
