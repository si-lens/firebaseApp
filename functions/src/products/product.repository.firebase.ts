
import * as admin from 'firebase-admin';
import {ProductRepository} from './product.repository';
import {Product} from "../models/products";

export class ProductRepositoryFirebase implements ProductRepository {
  topProductsPath = 'top-products';


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  updateProduct(product: Product): Promise<any> {
    return this.db().doc(`products/${product.id}`).update(product);
  }


}
