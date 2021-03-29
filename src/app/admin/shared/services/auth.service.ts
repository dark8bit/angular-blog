import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../shared/interfaces/user';
import { Observable, Subject, throwError } from 'rxjs';
import { Urls } from '../../../core/urls/urls';
import { FbAuthResponse } from '../../../shared/interfaces/fb-auth-response';
import { catchError, tap } from 'rxjs/operators';
import { AuthErrorResponse } from '../enums/auth-error-response.enum';
import { AuthResponse } from '../enums/auth-response.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  public get token(): string {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));

    if (new Date() > expDate) {
      this.logout();

      return null;
    }

    return localStorage.getItem('fb-token');
  }

  public login(user: User): Observable<any> {
    const url = Urls.signInWithPassword();
    user.returnSecureToken = true;

    return this.http.post(url, user)
      .pipe(
        tap((res: FbAuthResponse) => this.setToken(res)),
        catchError(error => this.handleError(error))
      );
  }

  public logout(): void {
    this.setToken(null);
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private setToken(response: FbAuthResponse | null): void {
    if (response) {
      const expiresIn: number = +response.expiresIn;
      const expDate: Date = new Date(new Date().getTime() + expiresIn * 1000);

      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());

      return;
    }

    localStorage.clear();
  }

  private handleError(error: HttpErrorResponse): Observable<void> {
    const {message} = error.error.error;

    switch (message) {
      case AuthErrorResponse.invalidEmail:
        this.error$.next(AuthResponse.errorEmail);
        break;
      case AuthErrorResponse.invalidPassword:
        this.error$.next(AuthResponse.errorPassword);
        break;
      case AuthErrorResponse.emailNotFound:
        this.error$.next(AuthResponse.errorNotEmail);
        break;
    }

    return throwError(error);
  }
}
