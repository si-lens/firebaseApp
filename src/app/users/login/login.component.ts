import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {UserService} from '../shared/user.service';
import {AuthenticationService} from '../../shared/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  db = this.afAuth.auth;

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService,
              private authService: AuthenticationService
  ) {
  }

  loading: boolean;

  ngOnInit() {
    this.loading = false;
  }

  login() {
    if (this.db.currentUser) {
      this.db.signOut().then(msg => console.log('you were logged out'));
    }
    const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const logInButton: HTMLInputElement = document.getElementById('logInButton') as HTMLInputElement;

    logInButton.addEventListener('click', e => {
      this.loading = true;
      const email = emailInput.value;
      const password = passwordInput.value;
      this.authService.signInWithEmailAndPassword(email, password).catch(er => {
        this.alertService.errorMessageShow(er.message + ' Try again.');
        this.loading = false;
      });
    });
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        this.userService.setUser(this.db.currentUser.uid);
        this.router.navigateByUrl('profile');
      } else {
        console.log('not logged in');
      }
    });
  }
}
