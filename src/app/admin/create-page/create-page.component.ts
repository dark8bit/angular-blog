import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../shared/interfaces/post';
import { PostsService } from '../shared/services/posts.service';
import { finalize } from 'rxjs/operators';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public form: FormGroup;
  public isCreatePost: boolean = false;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.form = this.initForm();
  }

  private initForm(): FormGroup {
    return this.fb.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]],
      author: [null, [Validators.required]]
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();
    const {title, text, author} = formValue;
    const date = new Date();

    const post: Post = {
      title,
      text,
      author,
      date
    };

    this.isCreatePost = true;

    this.postsService.createPost(post)
      .pipe(
        finalize(() => this.isCreatePost = false)
      )
      .subscribe((res) => {
        this.form.reset();
        this.alertService.success('Пост создан');
      });
  }

}
