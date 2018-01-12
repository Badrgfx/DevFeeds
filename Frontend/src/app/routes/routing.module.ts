import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { TopicsComponent } from '../topics/topics.component';
import { HomeComponent } from '../home/home.component';
import { NewTopicComponent } from '../new-topic/new-topic.component';
import { TopicDetailsComponent } from './../topic-details/topic-details.component';
import { AuthGuardLogin } from '../services/auth-guard-login.service';
import { HomeLoginComponent } from '../home-login/home-login.component';
import { SignupComponent } from '../signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent , canActivate: [AuthGuardLogin]},
  { path: 'login', component: HomeLoginComponent },
  { path: 'topics/new', component: NewTopicComponent , canActivate: [AuthGuardLogin]},
  { path: 'topics/:id', component: TopicDetailsComponent, canActivate: [AuthGuardLogin]},
  { path: 'signup', component: SignupComponent},
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}
