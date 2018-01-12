import { Topic } from './../shared/models/topic.model';
import { User } from './../shared/models/user.model';
import { Component, OnInit, NgZone} from '@angular/core';
import { TopicService } from './../services/topic.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

import {AuthServiceLogin} from '../services/authlogin.service';
import {UploadimageService} from '../services/uploadimage.service';

@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {

  topic = new Topic();
  addTopicForm: FormGroup;

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  stillUpload = false;



  constructor(private ngZone: NgZone, private router: Router,
    private service: TopicService, private formBuilder: FormBuilder, 
    private auth: AuthServiceLogin, private uploadService: UploadimageService) {

    this.addTopicForm = formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(50)
      ]],
      content: ['', [
        Validators.required,
        Validators.minLength(20)
      ]],
      image: ['', [
        Validators.required,
      ]]
   });
   }

  ngOnInit() { }

  get title(){
    return this.addTopicForm.get('title');
  }
  get description(){
    return this.addTopicForm.get('description');
  }
  get content(){
    return this.addTopicForm.get('content');
  }
  get image(){
    return this.addTopicForm.get('image');
  }

  createTopic() {
    this.topic.title = this.addTopicForm.value.title;
    this.topic.description = this.addTopicForm.value.description;
    this.topic.content = this.addTopicForm.value.content;
    this.topic.user = this.auth.currentUser;
    this.service.create(this.topic)
      .subscribe( newTopic => {
        this.upload(newTopic.id);
        this.addTopicForm.reset();
      },
      error => console.log(error)
   );
}

selectFile(event) {
  const file = event.target.files.item(0);

  if (file.type.match('image.*')) {
    this.selectedFiles = event.target.files;
  } else {
    alert('invalid format!');
  }
}

upload(id) {
  this.progress.percentage = 0;

  this.currentFileUpload = this.selectedFiles.item(0);
  this.stillUpload = true;
  this.uploadService.pushFileToStorage(this.currentFileUpload, id).subscribe(event => {
    if (event.type === HttpEventType.UploadProgress) {
      this.progress.percentage = Math.round(100 * event.loaded / event.total);
    } else if (event instanceof HttpResponse) {
      this.stillUpload = false;
      this.ngZone.run(() => this.router.navigate(['']));
    }
  });

  this.selectedFiles = undefined;
}

}
