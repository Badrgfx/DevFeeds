import { AuthServiceLogin } from './../services/authlogin.service';
import { Component, OnInit } from '@angular/core';
import {CommentService} from '../services/comment.service';
import {ActivatedRoute} from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { User } from './../shared/models/user.model';
import { Comment } from './../shared/models/comment.model';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {


  size = 3;
  idTopic;
  comments: any[];
  addCommentForm: FormGroup;
  currentuser = new User();
  comment = new Comment();
  isLoading = true;
  pageComments = 0;
  CommentUpdatelist: any [];
  lastElement = false;

  constructor(private service: CommentService, private route: ActivatedRoute,
     private formBuilder: FormBuilder, private authServiceLogin: AuthServiceLogin) {
    this.addCommentForm = formBuilder.group({
      content: ['', Validators.required]
   });
   }

  ngOnInit() {
    this.getTopicId();
    this.getComments();
  }

  getComments() {
  this.service.getTopicComments(this.idTopic , this.pageComments, this.size).subscribe(comments => {
    this.comments = comments.content;
    this.isLoading = false;
  });

  }

  commentTopic() {
    this.comment.content = this.addCommentForm.value.content;
    this.comment.user = this.authServiceLogin.currentUser;
    this.service.commentTopic(this.idTopic, this.comment)
      .subscribe( newComment => {
        this.addCommentForm.reset();
        this.comments.unshift(newComment);
      },
      error => console.log(error)
   );
  }

  getTopicId() {
    this.route.params.subscribe( params => this.idTopic = params.id);
  }

  loadMoreComments() {
      this.pageComments++;
      this.service.getTopicComments( this.idTopic , this.pageComments, this.size).subscribe(data => {
        this.CommentUpdatelist = data.content;
        for (let i = 0; i < this.CommentUpdatelist.length; i++) {
          this.comments.push(this.CommentUpdatelist[i]);
       }
       if (data.last) {
        this.lastElement = true;
        }
    });
  }


}
