import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public isAuthProcess = false;
  public paramsMessage = '';


  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.form = this.initForm();
    this.route.queryParams.subscribe((params: Params) => {
      if (params?.loginAgain) {
        this.paramsMessage = 'Пожалуйста, введите данные';
        return;
      }

      if (params?.authFailed) {
        this.paramsMessage = 'Сессия истекла. Пожалуйста авторизуйтесь';
        return;
      }
    });
  }

  private initForm(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  public submit(): void {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.getRawValue();

    const user: User = {
      email: formValue.email,
      password: formValue.password
    };

    this.isAuthProcess = true;
    this.authService.login(user)
      .pipe(
        finalize(() => {
          this.isAuthProcess = false;
        })
      )
      .subscribe((res) => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
      });
  }
}
