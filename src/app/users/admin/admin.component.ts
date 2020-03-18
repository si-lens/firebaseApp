import { Component, OnInit } from '@angular/core';
import {UserService} from '../shared/user.service';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: User[];
  disabledUsers: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers(false).subscribe( users => this.users = users);
    this.userService.getUsers(true).subscribe(disabledUsers => this.disabledUsers = disabledUsers);
  }


  delete(user: User) {
    this.userService.delete(user, user.isDisabled);
  }

  setRole(user: User) {
    user.isAdmin = true;
    this.userService.update(user, user.isDisabled);
  }

  blockOrUnblock(user: User, b: boolean) {
  user.isDisabled = b;
  this.userService.update(user, user.isDisabled)
    .then(() => this.userService.transferUser(user));
  }
}
