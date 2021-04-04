import { Component, OnInit } from '@angular/core';
import { PostsService } from '../admin/shared/services/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces/post';
import { SortType } from '../shared/enums/sort-type.enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public posts$: Observable<Post[]>;
  public sortType = SortType;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.postsService.getAllPosts();
  }

}
