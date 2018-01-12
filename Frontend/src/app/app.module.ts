import { CommentService } from './services/comment.service';
import { DataService } from './services/data.service';
import { TopicService } from './services/topic.service';
import { AuthServiceLogin } from './services/authlogin.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { UploadimageService} from './services/uploadimage.service';
import { UserService } from './services/user.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule} from '@angular/http';
import { HttpClientModule} from '@angular/common/http';
import { RoutingModule } from './routes/routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import './services/getFBSDK';


import { AppComponent } from './app.component';
import { TopicsComponent } from './topics/topics.component';
import { HomeComponent } from './home/home.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { CommentsComponent } from './comments/comments.component';
import { HeaderComponent } from './header/header.component';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    HomeComponent,
    NewTopicComponent,
    CommentsComponent,
    HeaderComponent,
    TopicDetailsComponent,
    HomeLoginComponent,
    LoadingComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RoutingModule
  ],
  providers: [TopicService, DataService, UserService, CommentService, UploadimageService, AuthServiceLogin, AuthGuardLogin],
  bootstrap: [AppComponent]
})
export class AppModule { }
