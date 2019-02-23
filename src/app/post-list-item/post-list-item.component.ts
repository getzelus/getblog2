import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() title: string;
  @Input() content: string;
  @Input() loveIts: number;
  @Input() created_at: Date;
  @Input() index: number;
  @Input() id: number;

  constructor(private postService: PostService) { }

  ngOnInit() {
  }
  onChangeLike(num: number){
    this.postService.changeLike(num, this.index);
  }

  onRemove(){
    this.postService.removePost(this.index);
  }


}
