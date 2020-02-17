import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../shared/custom-validators';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss']
})
export class NewAccountComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private fb: FormBuilder, private router: Router, private alertService: AlertService) {
    this.signUpForm = this.createSignupForm();
  }
  public signUpForm: FormGroup;

  ngOnInit() {}

  submit() {
    const emailInput: HTMLInputElement = document.getElementById('email') as HTMLInputElement;
    const passwordInput: HTMLInputElement = document.getElementById('password') as HTMLInputElement;
    const email = emailInput.value;
    const password = passwordInput.value;
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.router.navigateByUrl('');
          this.alertService.successMessageShow('Account successfully created.');
        }
        )
        .catch(er => this.alertService.errorMessageShow(er.message));
  }
  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        // Check email, whether it's here and it's valid
        email: [null, Validators.compose([
          Validators.email,
          Validators.required])
        ],
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
