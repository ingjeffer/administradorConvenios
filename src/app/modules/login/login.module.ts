import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components';
import { HomeLoginComponent } from './home-login.component';
import { LoginService } from './services';


@NgModule({
  declarations: [
    LoginComponent,
    HomeLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    LoginService
  ]
})
export class LoginModule { }
