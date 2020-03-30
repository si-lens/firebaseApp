import {StockRepository} from "./stock.repository";
import * as admin from 'firebase-admin';
import {Product} from "../models/products";
import {Stock} from "../models/stock";

export class StockRepositoryFirebase implements StockRepository{
  stockCreate(product:Product): Promise<any> {
   return this.db().collection('stocks').add({
     count: 1000,
     product: product
   })
  }
  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }


  decreaseStockCount(difference: number, product: Product): Promise<any> {
    const stockCollection = this.db().collection("stocks");

      return stockCollection.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          const stock = doc.data() as Stock;
          // If stocks's product.id is the same as id of currently bought product, stocks will be updated
          if(stock.product.id === product.id) {
            stock.count -= difference;
            stock.product.timesPurchased += difference;
            return stockCollection.doc(`${doc.id}`).update(stock)
              .catch(() => console.log("\"decreaseStockCount: \"Stock updated"))
              .then(() => console.log("\"decreaseStockCount: \"Stock update failed"));
          } else {
            return Promise.resolve();
          }
        });
      })
      .catch(function(error) {
        console.log("\"decreaseStockCount: \" Error getting documents: ", error);
      });

  }

  updateProductInStock(product: Product): Promise<any> {

    const stockCollection = this.db().collection("stocks");

    return stockCollection.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          const stock = doc.data() as Stock;
          // If stocks's product.id is the same as id of currently updated product, stocks will be updated
          if(stock.product.id === product.id) {
            stock.product = product;
            return stockCollection.doc(`${doc.id}`).update(stock)
              .catch(() => console.log("\"decreaseStockCount: \"Stock updated"))
              .then(() => console.log("\"decreaseStockCount: \"Stock update failed"));
          } else {
            return Promise.resolve();
          }
        });
      })
      .catch(function(error) {
        console.log("\"decreaseStockCount: \" Error getting documents: ", error);
      });
  }

  deleteStock(id: string): Promise<any> {

    const stockCollection = this.db().collection("stocks");
    return stockCollection.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          const stock = doc.data() as Stock;
          // If stocks's product.id is the same as id of currently updated product, stocks will be updated
          if(stock.product.id === id) {
             return stockCollection.doc(`${doc.id}`).delete()
              .catch(() => console.log("\"decreaseStockCount: \"Stock update failed"))
              .then(() => console.log("\"decreaseStockCount: \"Stock updated"));
          } else {
            return Promise.resolve();
          }
        });
      })
      .catch(function(error) {
        console.log("\"decreaseStockCount: \" Error getting documents: ", error);
      });
  }
}
