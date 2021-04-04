import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../interfaces/alert';
import { AlertType } from '../enums/alert-type.enum';

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  public success(text: string): void {
    this.alert$.next({type: AlertType.success, text});
  }

  public warning(text: string): void {
    this.alert$.next({type: AlertType.warning, text});
  }

  public danger(text: string): void {
    this.alert$.next({type: AlertType.danger, text});
  }
}
