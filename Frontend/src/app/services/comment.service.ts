import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CommentService {

  url = 'http://localhost:8080/api/topics/';
  constructor(public http: Http) { }

  getTopicComments(topicId, page, size) {
    return this.http.get(this.url + topicId + '/comments?page=' + page + '&size=' + size )
      .map(response => response.json());
  }

  commentTopic(topicId, comment) {
    return this.http.put(this.url + topicId + '/comment', comment)
    .map(response => response.json());
  }

}
