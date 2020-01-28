import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router: Router) {
    this.success.subscribe((message) => this.successMessage = message);
    this.error.subscribe((message) => this.errorMessage = message);
  }
  success = new Subject<string>();
  error = new Subject<string>();
  successMessage: string;
  errorMessage: string;


  public successMessageShow(msg: string) {
    this.success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
    this.success.next(msg);
  }
  public errorMessageShow(msg: string) {
    this.error.pipe(
      debounceTime(3000)
    ).subscribe(() => this.errorMessage = null);
    this.error.next(msg);
  }
}
