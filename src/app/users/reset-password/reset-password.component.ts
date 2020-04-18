import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {UserService} from '../shared/user.service';
import {AuthenticationService} from '../../shared/auth/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private  afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService,
              private authService: AuthenticationService) { }

  ngOnInit() {
  }
  sendCode() {
    const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const email = emailInput.value;
    if (email.length > 0) {
      this.authService.sendPasswordResetEmail(emailInput.value);
      this.alertService.successMessageShow('Password change link was sent to your email account.');
    } else {
      this.alertService.errorMessageShow('Put you email if you want to resent password.');
    }
  }
}
