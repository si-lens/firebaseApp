import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }
  createAccount() {
    const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const createAcc: HTMLInputElement = document.getElementById('createAcc') as HTMLInputElement;


    createAcc.addEventListener('click', e => {
      const email = emailInput.value;
      const password = passwordInput.value;
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .catch(er => console.log(er.message));
    });
  }
}
