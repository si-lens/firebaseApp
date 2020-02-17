import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {UserService} from '../shared/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService
  ) {
  }
  loading: boolean;
  ngOnInit() {
    this.loading = false;
  }
  login() {
    const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const logInButton: HTMLInputElement = document.getElementById('logInButton') as HTMLInputElement;


    logInButton.addEventListener('click', e => {
      this.loading = true
      const email = emailInput.value;
      const password = passwordInput.value;
      this.afAuth.auth.signInWithEmailAndPassword(email, password).
      catch(er => {
        this.alertService.errorMessageShow(er.message + ' Try again.');
        this.loading = false;
      });
    });

    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.userService.setID(this.afAuth.auth.currentUser.uid);
        this.router.navigateByUrl('profile');
      } else {
        console.log('not logged in');
      }
    });
  }

}
