import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private  afAuth: AngularFireAuth, private router: Router) { }
  ngOnInit() {}

  logout() {
    this.afAuth.auth.signOut();
    this.afAuth.auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
      } else {
        console.log('not logged in');
        this.router.navigateByUrl('');
      }
    });
  }
}
