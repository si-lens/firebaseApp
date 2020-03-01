import { Injectable } from '@angular/core';
import {User} from '../users/shared/user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observer} from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: User;
  private db = this.afAuth.auth;

  constructor(public afAuth: AngularFireAuth) {
  }

  getCurrentUserValue(): User {
    return this.currentUser;
  }

  setCurrentUser(u: User) {
    this.currentUser = u;
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.db.signInWithEmailAndPassword(email, password);
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
  sendPasswordResetEmail(email: string) {
    return this.db.sendPasswordResetEmail(email);
  }
  changePassword(password: string): Promise<any> {
    return this.db.currentUser.updatePassword(password);
  }
}
