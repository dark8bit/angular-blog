import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatSidenavModule,
  NoopAnimationsModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  BrowserAnimationsModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    ...modules
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    ...modules
  ]
})
export class SharedModule {
}
