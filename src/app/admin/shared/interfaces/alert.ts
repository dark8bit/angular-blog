import { AlertType } from '../enums/alert-type.enum';

export interface Alert {
  type: AlertType;
  text: string;
}
