import {StockRepository} from "./stock.repository";
import * as admin from 'firebase-admin';
import {Product} from "../models/products";
import {Stock} from "../models/stock";
export class StockRepositoryFirebase implements StockRepository{
  stockProductCreate(product:Product): Promise<any> {
   return this.db().collection('stock').add({
     count: 5,
     product: product
   })
  }
  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  decreaseStockCount(difference: number, productID: any): Promise<any> {
    const citiesRef = this.db().collection("stock");
    let query = citiesRef.where("count", "==", 5);

    return query.get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          let stock = doc.data() as Stock;
          console.log("count: "+ stock.count);
          console.log("id: "+ stock.product.id);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });


  }
}
