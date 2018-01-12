import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { TopicService } from './../services/topic.service';
import { Topic } from './../shared/models/topic.model';
import { User } from './../shared/models/user.model';
import {AuthServiceLogin} from '../services/authlogin.service';

@Component({
  selector: 'app-topic-details',
  templateUrl: './topic-details.component.html',
  styleUrls: ['./topic-details.component.css']
})
export class TopicDetailsComponent implements OnInit {

  idTopic;
  topic = new Topic();
  user = new User();
  isLoading = true;

  constructor(private service: TopicService, private route: ActivatedRoute,
    private auth: AuthServiceLogin) { }

  ngOnInit() {
    this.getOnetopic();
  }

  getOnetopic() {
    this.getTopicId();
    this.service.getOneRessource(this.idTopic, this.auth.currentUser.id).subscribe(topic => {
      this.topic = topic;
      this.user = topic.user;
      this.isLoading = false;
    });
  }

  getTopicId() {
    this.route.params.subscribe( params => this.idTopic = params.id);
  }

  VoteTopic(topicId, UserId) {
    this.service.VoteTopic(topicId, this.auth.currentUser.id);
  }

  unVoteTopic(topicId, UserId ) {
    this.service.unVoteTopic(topicId, this.auth.currentUser.id);
  }

  VoteTopicStyleChange() {
    if (!this.topic.votedByConnectuser) {
      this.VoteTopic(this.topic.id, this.auth.currentUser.id);
      this.topic.sizeVotes++;
    } else {
      this.unVoteTopic(this.topic.id, this.auth.currentUser.id);
      this.topic.sizeVotes--;
  }
  this.topic.votedByConnectuser = !this.topic.votedByConnectuser;
}

}
