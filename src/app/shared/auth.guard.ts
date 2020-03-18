import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from '../users/shared/user.service';
import {User} from './models/user';
import {AuthenticationService} from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  currentUser: User;
  constructor(
    private router: Router,
    private  afAuth: AngularFireAuth,
    private authService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = this.authService.getCurrentUserValue();
    if (this.currentUser.isAdmin) {
      return true;
    }

    this.router.navigate(['/profile']);
    console.log('access denied');
    return false;
  }
}
