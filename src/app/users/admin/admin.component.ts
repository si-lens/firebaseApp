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
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe( users => this.users = users);
  }


  delete(user: User) {
    this.userService.delete(user);
  }

  setRole(user: User) {
    user.isAdmin = true;
    this.userService.update(user);
  }

  blockOrUnblock(user: User, b: boolean) {
  user.isBlocked = b;
  this.userService.update(user);
  }
}
