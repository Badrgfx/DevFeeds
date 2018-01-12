import { DataService } from './data.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TopicService extends DataService {

  popularTopicsUrl = 'http://localhost:8080/api/topics/popular';
  newestTopicsUrl = 'http://localhost:8080/api/topics/';

  constructor(http: Http) {
    super('http://localhost:8080/api/topics', http);
   }

   VoteTopic(topicId, UserId) {
    this.http.put('http://localhost:8080/api/topics/' + topicId + '/vote?userId=' + UserId, {})
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
   }

   unVoteTopic(topicId, UserId) {
    this.http.put('http://localhost:8080/api/topics/' + topicId + '/unvote?userId=' + UserId, {})
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log('Error occured');
        }
      );
   }

   getNewestTopics(page: number, size: number, id?: number) {
      return this.http.get(this.newestTopicsUrl + '?page=' + page + '&size=' + size + '&id=' + id)
        .map(response => response.json());
     }

   getPopularTopics(page: number, size: number, id?: number) {
      return this.http.get(this.popularTopicsUrl + '?page=' + page + '&size=' + size + '&id=' + id)
        .map(response => response.json());
     }

}
