import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  name: string = 'Post';
  content: string = 'Content';
  //status: string = 'Statut';

  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.name = this.postService.getPostById(+id).title;
    this.content = this.postService.getPostById(+id).content;
  }

}
