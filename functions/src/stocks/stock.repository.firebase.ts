import {StockRepository} from "./stock.repository";
import * as admin from 'firebase-admin';
import {Product} from "../models/products";
import {Stock} from "../models/stock";

export class StockRepositoryFirebase implements StockRepository{
  stockPath = 'stocks/';
  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  stockCreate(product:Product,id: string): Promise<any> {
   return this.db().doc(`${this.stockPath}${id}`).create({
     count: 1000,
     product: product
   })
  }
  decreaseStockCount(difference: number, product: Product,id:string): Promise<any> {
    return this.db().doc(`${this.stockPath}${id}`).get().then((snap) =>{
      const stock = snap.data() as Stock;
      stock.count -= difference;
      stock.product.timesPurchased +=difference;
      return this.db().doc(`${this.stockPath}${id}`).update(stock);
    });
  }

  updateProductInStock(product:Product,id: string): Promise<any> {
    return this.db().doc(`${this.stockPath}${id}`).get().then((snap) =>{
      const stock = snap.data() as Stock;
      stock.product = product;
      return this.db().doc(`${this.stockPath}${id}`).update(stock);
    });
  }

   deleteStock(id: string): Promise<any> {
    return this.db().doc(`${this.stockPath}${id}`).delete();
  }
}
