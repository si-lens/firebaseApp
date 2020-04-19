import { Component } from '@angular/core';
import {AlertService} from './shared/alert-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'firebaseApp';
  constructor(public alertService: AlertService) {}
}
