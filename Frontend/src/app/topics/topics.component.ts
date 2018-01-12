import { AuthServiceLogin } from './../services/authlogin.service';
import { Topic } from './../shared/models/topic.model';
import { Component, OnInit } from '@angular/core';
import { TopicService } from './../services/topic.service';


@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  isLoading: boolean;
  topics: any [];
  pagePopular= 0;
  pageNewest= 0;
  size= 5;
  typeTopics = 'new';
  topicUpdatelist: any [];
  lastElement= false;


  constructor(private service: TopicService, private authServiceLogin: AuthServiceLogin) { }

  ngOnInit() {
    this.getNewestTopics();
  }

  VoteTopic(topicId, UserId) {
    this.service.VoteTopic(topicId, UserId);
  }

  unVoteTopic(topicId, UserId ) {
    this.service.unVoteTopic(topicId, UserId);
  }

  VoteTopicStyleChange(TopicId) {
    if (!this.topics.find(x => x.id === TopicId).votedByConnectuser) {
      console.log('vote');
      this.VoteTopic(TopicId, this.authServiceLogin.currentUser.id);
      this.topics.find(x => x.id === TopicId).sizeVotes += 1;
    } else {
      console.log('unvote');
      this.unVoteTopic(TopicId, this.authServiceLogin.currentUser.id);
      this.topics.find(x => x.id === TopicId).sizeVotes -= 1;
  }
  this.topics.find(x => x.id === TopicId).votedByConnectuser = !this.topics.find(x => x.id === TopicId).votedByConnectuser;
  console.log (this.topics.find(x => x.id === TopicId).votedByConnectuser);
}

 getPopularTopics() {
  this.isLoading = true;
  this.lastElement = false;
  this.service.getPopularTopics(this.pagePopular, this.size, this.authServiceLogin.currentUser.id).subscribe(topics => {
      this.topics = topics.content;
      this.isLoading = false;
      if (topics.last) {
        this.lastElement = true;
        }
    });
    this.typeTopics = 'popular';
    this.pageNewest = 0;

 }
 getNewestTopics() {
  this.isLoading = true;
  this.lastElement = false;
  this.service.getNewestTopics(this.pageNewest, this.size, this.authServiceLogin.currentUser.id).subscribe(topics => {
    this.topics = topics.content;
    this.isLoading = false;
    if (topics.last) {
      this.lastElement = true;
      }
  });
  this.typeTopics = 'new';
  this.pagePopular = 0;

}

loadMoreTopics() {
  if (this.typeTopics === 'new') {
    this.pageNewest++;
    this.service.getNewestTopics( this.pageNewest , this.size, this.authServiceLogin.currentUser.id).subscribe(data => {
      this.topicUpdatelist = data.content;
      for (let i = 0; i < this.topicUpdatelist.length; i++) {
        this.topics.push(this.topicUpdatelist[i]);
     }
     if (data.last) {
      this.lastElement = true;
      }

  });
}
  if (this.typeTopics === 'popular') {
    this.pagePopular++;
    this.service.getPopularTopics(this.pagePopular , this.size, this.authServiceLogin.currentUser.id).subscribe(data => {
      this.topicUpdatelist = data.content;
      for (let i = 0; i < this.topicUpdatelist.length; i++) {
        this.topics.push(this.topicUpdatelist[i]);
     }
     if (data.last) {
      this.lastElement = true;
      }
    });
  }
}


}
