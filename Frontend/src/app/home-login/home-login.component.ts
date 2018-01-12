import { Component, OnInit } from '@angular/core';
import {AuthServiceLogin} from '../services/authlogin.service';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.css']
})
export class HomeLoginComponent implements OnInit {



  constructor(private auth: AuthServiceLogin) { }

  ngOnInit() {
    this.auth.logout();
  }

  login() {
    this.auth.signInWithFB();
    }
  }



