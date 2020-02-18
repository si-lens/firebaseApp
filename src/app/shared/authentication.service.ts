import { Injectable } from '@angular/core';
import {User} from '../users/shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  currentUser: User;
  constructor() { }
   getCurrentUserValue(): User {
    return this.currentUser;
  }
   setCurrentUser(u: User) {
    this.currentUser = u;
  }
}
