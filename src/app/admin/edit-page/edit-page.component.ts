import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../shared/services/posts.service';
import { finalize, switchMap } from 'rxjs/operators';
import { Post } from '../../shared/interfaces/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public isUpdatePost = false;

  private post: Post;
  private uSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params?.id);
        })
      ).subscribe((post: Post) => {
      this.post = post;
      this.form = this.initForm(post);
    });
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();
    const {text, title} = formValue;

    this.isUpdatePost = true;
    this.uSub = this.postsService.updatePost({
      ...this.post,
      text,
      title,
    })
      .pipe(
        finalize(() => this.isUpdatePost = false)
      )
      .subscribe(() => {
        this.alertService.success('Пост обновлен');
      });
  }

  private initForm(post: Post): FormGroup {
    return this.fb.group({
      title: [post.title, [Validators.required]],
      text: [post.text, [Validators.required]]
    });
  }
}
