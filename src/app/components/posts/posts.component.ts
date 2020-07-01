import { Component, OnInit } from '@angular/core';
import {IPosts} from '../../models/IPosts';
import {PostsService} from '../../services/posts.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: IPosts[] = [];
  constructor(private postsService: PostsService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts = () => {
    this.postsService.getPosts().subscribe(res => {
      this.posts = res;
    });
  }

  updatePost = (element: IPosts) => {
    this.postsService.updatePosts(element.id, element).subscribe(res => {
       this.posts.forEach((e, i) => {
         if (res.id === e.id) {
           this.posts[i] = res;
         }
       });
       this.message('post updated');
    });
  }

  deletePost = (id) => {
    this.postsService.deletePosts(id).subscribe(res => {
      this.posts.forEach((e, i) => {
        if (id === e.id) {
          this.posts.splice(i, 1);
        }
      });
      this.message('post deleted');
    });
  }
  openDialog = (data: IPosts) => {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '120vh',
      height: '35%',
      data
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.actionType === 'update') {
        this.updatePost(res.formValue);
      } else if (res.actionType === 'delete') {
        this.deletePost(data.id);
      }
    });
}

  message = (message: string, action: string = '') => {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
