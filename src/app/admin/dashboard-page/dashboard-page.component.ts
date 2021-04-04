import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../shared/services/posts.service';
import { Post } from '../../shared/interfaces/post';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';
import { SortType } from '../../shared/enums/sort-type.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public searchStr = '';
  public sortType = SortType;

  private pSub: Subscription;
  private dSub: Subscription;

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.pSub = this.postsService.getAllPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  public deletePost(id: string): void {
    this.dSub = this.postsService.deletePost(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning('Пост удален');
    });
  }
}
