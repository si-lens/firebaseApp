import { Injectable } from '@angular/core';
import {from, Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {map} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from '../../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore) { }
  getProducts(): Observable<Product[]> {
    return this.db.collection<Product>('products').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data };
      }))
    );
  }
  getProduct(ID: string): Promise<any> {
    return this.db.collection('products').doc(ID).snapshotChanges().toPromise();
  }
  create(product: Product): Promise<any> {
    product.timesPurchased = 0;
    return this.db.collection('products').add(product);
  }
  delete(id: string): Observable<any> {
    return from(this.db.doc<Product>(`products/${id}`).delete());
  }
  update(p: Product, id: string): Promise<any> {
    return this.db.doc<Product>(`products/${id}`).update(p);
  }
}
