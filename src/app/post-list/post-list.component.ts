import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: any[];
  postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
     this.postSubscription = this.postService.postsSubject.subscribe(
       (posts: any[]) => {
         this.posts = posts;
       }
     );
    // this.onFetch();
     this.postService.emitPostSubject();
   }

  onResetLikes(){
    this.postService.resetLikes();
  }

  ngOnDestroy() {
   this.postSubscription.unsubscribe();
  }
  onSave() {
    this.postService.savePostsToServer();
  }
  onFetch() {
    this.postService.getPostsFromServer();
  }

}
