import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {NewAccountComponent} from './new-account/new-account.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {AlertService} from '../shared/alert-service.service';


@NgModule({
  declarations: [ProfileComponent, NewAccountComponent, LoginComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class UsersModule { }
