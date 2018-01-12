import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable()
export class UserService extends DataService {

  constructor(http: Http) {
    super('http://localhost:8080/api/users', http);
   }

   getUserByFacebookId(FacebookId) {
      return this.http.get('http://localhost:8080/api/users/' + FacebookId)
        .map(response => response.json());
   }

   checkUsernameExist(username) {
    return this.http.get('http://localhost:8080/api/checkusername/' + username)
      .map(response => response.json());
 }
 
}
