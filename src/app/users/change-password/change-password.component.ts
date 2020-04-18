import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {UserService} from '../shared/user.service';
import {CustomValidators} from '../../shared/custom-validators';
import {AuthenticationService} from '../../shared/auth/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,
              private fb: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService,
              private authService: AuthenticationService
  ) {
    this.signUpForm = this.createSignupForm();
  }
  public signUpForm: FormGroup;

  ngOnInit() {}

  submit() {
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const password = passwordInput.value;
    this.authService.changePassword(password).then( success => {
          this.router.navigateByUrl('/profile');
          this.alertService.successMessageShow('Password successfully changed.');
      }
    ).catch( error => {
      console.log(error);
      this.alertService.errorMessageShow('Something went wrong.');
    });
  }
  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        password: [ null, Validators.compose([
          // 1. Password Field is Required
          Validators.required,
          // 2. check whether the entered password has a number
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // 3. check whether the entered password has upper case letter
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // 4. check whether the entered password has a lower-case letter
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // 5. check whether the entered password has a special character
          CustomValidators.patternValidator(
            /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            {
              hasSpecialCharacters: true
            }
          ), // 6. Has a minimum length of 8 characters
          Validators.minLength(6)])
        ],
        confirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      });
  }

}
