import { AuthServiceLogin } from './../services/authlogin.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor(private authServiceLogin: AuthServiceLogin) { }

  ngOnInit() {
        this.isLoggedIn$ = this.authServiceLogin.loggedIn;
  }

  logout() {
    this.authServiceLogin.logout();
  }

}
