import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { SearchPipe } from './shared/pipes/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';

const routes: Routes = [{
  path: '', component: AdminLayoutComponent, children: [
    {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent},
    {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuardService]},
    {path: 'create', component: CreatePageComponent, canActivate: [AuthGuardService]},
    {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuardService]},
  ]
}];

const components = [
  AdminLayoutComponent,
  LoginPageComponent,
  DashboardPageComponent,
  CreatePageComponent,
  EditPageComponent
];

const services = [
  AuthGuardService,
  AlertService
];

@NgModule({
  declarations: [...components, SearchPipe, AlertComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [...services]
})
export class AdminModule {
}
