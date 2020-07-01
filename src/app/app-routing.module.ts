import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from './components/app/app.component';
import {PostsComponent} from './components/posts/posts.component';
import {HomeComponent} from './components/home/home.component';


const routes: Routes = [
  { path: 'Enter', component: AppComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'posts', component: PostsComponent},
      {path: '', component: HomeComponent}
    ]},
  { path: '', component: AppComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
