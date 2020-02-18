import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, of} from 'rxjs';
import {User} from './user.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserID = '';
  currentUser = '';
  constructor(private db: AngularFirestore) { }
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
    return this.db.collection<User>('users', ref => ref.where('email', '==', this.currentUser))
      .snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  setUser(e: string) {
    this.currentUser = e;
  }

  update(user: Partial<User>): Observable<any> {
    return of(this.db.doc(`users/${user.id}`).set(user));
  }
}
