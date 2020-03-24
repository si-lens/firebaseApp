
import * as admin from 'firebase-admin';
import {ProductRepository} from './product.repository';


export class ProductRepositoryFirebase implements ProductRepository {
  topProductsPath = 'top-products';


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  createStockProduct(productID: string): Promise<any> {
    return this.db().collection('stock').add({
      count: 5,
      productID: productID
    });
  }
}
