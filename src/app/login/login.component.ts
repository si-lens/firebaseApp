import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }
  ngOnInit() {
  }
  login() {
    const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const logInButton: HTMLInputElement = document.getElementById('logInButton') as HTMLInputElement;


    logInButton.addEventListener('click', e => {
      const email = emailInput.value;
      const password = passwordInput.value;
      this.afAuth.auth.signInWithEmailAndPassword(email, password).
      catch(er => console.log(er.message));
    });

    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        this.router.navigateByUrl('profile');
      } else {
        console.log('not logged in');
      }
    });
  }
}
