import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../shared/user.service';
import {User} from '../../shared/models/user';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../../shared/auth/authentication.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy, OnInit {

  currentUser: User;
  userForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    age: new FormControl('')
  });
  subscription: Subscription;

  constructor(private  afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService,
              public authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe(user => {
      this.currentUser = user[0];
      this.authService.setCurrentUser(user[0]);
      this.userForm.patchValue({
        name: this.currentUser.name,
        surname: this.currentUser.surname,
        age: this.currentUser.age
      });
      this.userForm.disable();
      console.log(this.authService.getCurrentUserValue());
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.signOut().then(() => this.alertService.successMessageShow('You were logged out.'))
      .catch(er => console.log(er.message))
      .then(() => this.router.navigateByUrl(''));
    this.ngOnDestroy();
  }
  save() {
    const user = this.userForm.value;
    this.currentUser.name = user.name;
    this.currentUser.surname = user.surname;
    this.currentUser.age = user.age;
    this.userService.update(this.currentUser);
  }
  loaded() {
    return this.currentUser !== undefined;
  }
}

