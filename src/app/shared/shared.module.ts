import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SortingPipe } from './pipes/sorting.pipe';

const modules = [
  MatSidenavModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatProgressSpinnerModule
]

const pipes = [
  SortingPipe
]

@NgModule({
  declarations: [...pipes],
  imports: [
    HttpClientModule,
    QuillModule.forRoot(),
    ...modules
  ],
  exports: [
    HttpClientModule,
    QuillModule,
    ...modules,
    ...pipes
  ]
})
export class SharedModule {
}
