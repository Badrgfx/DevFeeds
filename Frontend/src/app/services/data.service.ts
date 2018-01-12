import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {

  constructor(private url: string, public http: Http) { }

  getAll() {
    return this.http.get(this.url)
      .map(response => response.json());
  }

  getOneRessource(id, userId?: number) {
    return this.http.get(this.url + '/' + id + '?userId=' + userId)
      .map(response => response.json());
  }


  create(resource) {
    return this.http.post(this.url, resource)
      .map(response => response.json());
  }

  update(resource) {
    return this.http.patch(this.url + '/' + resource.id, JSON.stringify({ isRead: true }))
      .map(response => response.json());
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .map(response => response.json());
  }

}

