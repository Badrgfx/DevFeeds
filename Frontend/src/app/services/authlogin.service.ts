import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from '../shared/models/user.model';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


declare var window: any;
declare var FB: any;

@Injectable()
export class AuthServiceLogin {
  loggedIn = new BehaviorSubject<boolean>(false);
  currentUser = new User();
  UserEmail;
  returnUrl= '';
  fbid;
  fbconnect;


  constructor(private ngZone: NgZone, private router: Router,
     private userService: UserService) {
  }

  signInWithFB() {
    FB.getLoginStatus((response) => {
      if (response.status === 'connected') {
        console.log(response.authResponse['userID']);
        this.getUserByFacebookId(response.authResponse['userID']).subscribe(user => {
          this.currentUser = user;
          this.fbid = response.authResponse['userID'];
        } , error => { console.log('Error: ', error); },
          () => {
            console.log('fin');
            this.naviagte();
          }
      );
    } else {
          FB.login((loginResponse) => {
this.signInWithFB();
          });
      }
    });
      }

  getUserByFacebookId(FacebookId) {
    return this.userService.getUserByFacebookId(FacebookId);
  }

  naviagte() {
     if (this.currentUser.id === 0) {
      this.currentUser.facebookId = this.fbid;
      this.ngZone.run(() => this.router.navigate(['signup']));
    }else {
    this.loggedIn.next(true);
    this.ngZone.run(() => this.router.navigate(['']));
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.currentUser = new User();
    this.router.navigate(['/login']);
  }
}
