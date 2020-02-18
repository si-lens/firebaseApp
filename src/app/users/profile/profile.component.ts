import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';
import {FormControl, FormGroup} from '@angular/forms';
import {Task} from "protractor/built/taskScheduler";
import * as firebase from "firebase";
import {AuthenticationService} from "../../shared/authentication.service";
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
  editMode = false;

  constructor(private  afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService,
              private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.subscription = this.userService.getUser().subscribe(user => {
      this.currentUser = user[0];
      this.authService.setCurrentUser(user[0]);
      console.log(this.authService.getCurrentUserValue());
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.afAuth.auth.signOut().then(() => this.alertService.successMessageShow('You were logged out.'))
      .catch(er => console.log(er.message));
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // console.log(firebaseUser);
      } else {
        console.log('not logged in');
        this.router.navigateByUrl('').catch(er => console.log(er.message));
      }
    });
    this.ngOnDestroy();
  }

  edit() {
    this.editMode = true;
    this.userForm.patchValue({
      name: this.currentUser.name,
      surname: this.currentUser.surname,
      age: this.currentUser.age
    });
  }

  save() {
    const user = this.userForm.value;
    this.currentUser.name = user.name;
    this.currentUser.surname = user.surname;
    this.currentUser.age = user.age;
    this.userService.update(this.currentUser);
    this.editMode = false;
  }

  back() {
    this.editMode = false;
  }

  sendCode() {
    this.afAuth.auth.sendPasswordResetEmail(this.currentUser.email);
    this.alertService.successMessageShow('Password change link was sent to your email account.');
  }
}

