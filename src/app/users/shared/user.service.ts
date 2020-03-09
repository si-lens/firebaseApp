import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {User} from './user.model';
import {map} from 'rxjs/operators';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserID = '';
  constructor(private db: AngularFirestore, private fireAuth: AngularFireAuth) { }
  getUsers(): Observable<User[]> {
    return this.db.collection<User>('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getUser(): Observable<User[]> {
    return this.db.collection<User>('users', ref => ref.where('id', '==', this.currentUserID))
      .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  setUser(e: string) {
    this.currentUserID = e;
  }
  update(u: User) {
   this.db.doc<User>(`users/${u.id}`)
      .set(u);
  }
  delete(u: User) {
    this.db.doc<User>(`users/${u.id}`).delete();
  }

}
