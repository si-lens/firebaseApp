import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AlertService} from '../../shared/alert-service.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, Subscription} from 'rxjs';
import {UserService} from '../shared/user.service';
import {User} from '../shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnDestroy, OnInit {

  currentUser: User[];

  subscription: Subscription;
  constructor(private  afAuth: AngularFireAuth,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService
  ) { }
  ngOnInit() {
   this.subscription = this.userService.getUser().subscribe( user => {
      this.currentUser = user;
    });
  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
  }
  logout() {
    this.afAuth.auth.signOut().
      then(() => this.alertService.successMessageShow('You were logged out.'))
      .catch(er => console.log(er.message));
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
        this.router.navigateByUrl('').catch(er => console.log(er.message));
      }
    });
  }
  edit() {

  }
  save() {

  }
}
