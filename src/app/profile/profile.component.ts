import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AlertService} from '../shared/alert-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private  afAuth: AngularFireAuth, private router: Router, private alertService: AlertService) { }
  ngOnInit() {}

  logout() {
    this.afAuth.auth.signOut().
      then(() => this.alertService.successMessageShow('You were logged out.'))
      .catch(er => console.log(er.message));
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
        this.router.navigateByUrl('').catch(er => console.log(er.message));;
      }
    });
  }
}
