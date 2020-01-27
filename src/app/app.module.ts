import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { LoginComponent } from './login/login.component';
import {AngularFireAuth} from '@angular/fire/auth';
import { NewAccountComponent } from './new-account/new-account.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewAccountComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'FirebaseApp')
  ],
  providers: [AngularFirestoreModule, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
