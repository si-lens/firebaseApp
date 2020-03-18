import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, Observable, of} from 'rxjs';
import {User} from '../../shared/models/user';
import {map} from 'rxjs/operators';
import {FirebaseAuth} from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUserID = '';
  constructor(private db: AngularFirestore, private fireAuth: AngularFireAuth) { }
  getUsers(disabled: boolean): Observable<User[]> {
    // Retrieve users/disabledUsers based upon boolean parameter
    const collectionName = this.getCollectionName(disabled);
    return this.db.collection<User>(collectionName).snapshotChanges().pipe(
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
  update(u: User, inDisabled: boolean): Promise<any> {
    // Update user either in "users" or "usersDisabled" collection
    const collactionName = this.getCollectionName(inDisabled);
    return this.db.doc<User>(`${collactionName}/${u.id}`)
      .set(u);
  }
  delete(u: User, fromDisabled: boolean) {
      // Delete user either from "users" or "usersDisabled" collection
      const collactionName = this.getCollectionName(fromDisabled);
      this.db.doc<User>(`${collactionName}/${u.id}`).delete();
  }
  transferUser(u: User) {
    // If user is disabled, remove his record from Users colletion and put it in usersDisabled
    if (u.isDisabled) {
      this.update(u, true);
      this.delete(u, false);
    }
    // Otherwise , remove record from usersDisabled colletion and put it in users
    else {
      this.update(u, false);
      this.delete(u, true);
    }
  }
  getCollectionName(fromDisabled: boolean) {
    if (!fromDisabled) {
      return 'users';
    } else {
      return  'usersDisabled';
    }
  }
}
