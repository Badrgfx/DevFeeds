import { User } from './../shared/models/user.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';

import {AuthServiceLogin} from '../services/authlogin.service';
import { UsernameValidators } from './username.validators';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = new User();
  signupForm: FormGroup;
  isLoading = false;


  constructor(private router: Router, private service: UserService, private formBuilder: FormBuilder, private auth: AuthServiceLogin) {

    this.signupForm = formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      username: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        UsernameValidators.cannotContainSpace
      ], this.isUsernameUnique.bind(this)
    ],
      fullname: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]]

   });
   }

  ngOnInit() {
    if (this.auth.currentUser.id !== 0){
      this.router.navigate(['/login']);
    }
   }

  get email(){
    return this.signupForm.get('email');
  }
  get username(){
    return this.signupForm.get('username');
  }
  get fullname(){
    return this.signupForm.get('fullname');
  }

  signup() {
    this.isLoading = true;
    this.user.username = this.signupForm.value.username;
    this.user.email = this.signupForm.value.email;
    this.user.name = this.signupForm.value.fullname;
    this.user.facebookId = this.auth.currentUser.facebookId;
    this.service.create(this.user)
      .subscribe( user => {
        this.auth.loggedIn.next(true);
        this.auth.currentUser.id = user.id;
        this.auth.currentUser.username = user.username;
        this.auth.currentUser.email = user.email;
        this.auth.currentUser.name = user.name;
        this.router.navigate(['']);
      },
      error => console.log(error)
   );
}

isUsernameUnique(control: FormControl) {
  const q = new Promise((resolve, reject) => {
      this.service.checkUsernameExist(control.value).subscribe(result => {
        if (result > 0) {
                resolve({ isUsernameUnique: true });
              } else {
                  resolve(null);
          }
      });
  });
  return q;
}

}
