import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
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
  getProduct(ID: string): Observable<any> {
    return this.db.collection('products').doc(ID).valueChanges();
  }
  create(product: Product): Promise<any> {
      return this.db.collection('products').add({
        name: product.name,
        available: product.available,
        price: product.price
      });
  }
  delete(id: string) {
    this.db.doc<Product>(`products/${id}`).delete();
  }
  update(p: Product, id: string): Promise<any> {
    return this.db.doc<Product>(`products/${id}`).update(p);
  }
}
