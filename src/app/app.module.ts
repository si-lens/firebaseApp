import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NgbAlert, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AlertService} from './shared/alert-service.service';
import { NgxsModule } from '@ngxs/store';
import {ProductState} from './products/shared/product.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'FirebaseApp'),
    NgbModule,
    NgxsModule.forRoot([ProductState], {
      developmentMode: !environment.production
    })
  ],
  providers: [AngularFirestoreModule, AngularFireAuth, AlertService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
