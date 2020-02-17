import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {User} from './user.model';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserID = '';
  currentUser: User;
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
    return this.db.collection<User>('users', ref => ref.where('id', '==', this.currentUserID))
      .valueChanges();
  }
  setID(id: string) {
    this.currentUserID = id;
  }
}
