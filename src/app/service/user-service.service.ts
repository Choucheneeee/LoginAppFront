import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  isloggedIn = true;
  authChanged = new Subject<void>();

  constructor() { }

  login() {
    this.isloggedIn = true;
    this.authChanged.next();
  }


}