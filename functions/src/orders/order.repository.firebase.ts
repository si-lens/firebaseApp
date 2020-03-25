
import * as admin from 'firebase-admin';
import {OrderRepository} from './order.repository';

export class OrderRepositoryFirebase implements OrderRepository {
  topProductsPath = 'top-products';


  db(): FirebaseFirestore.Firestore {
    return admin.firestore();
  }

  doSth(x: string): any {
    return null;
  }


}
