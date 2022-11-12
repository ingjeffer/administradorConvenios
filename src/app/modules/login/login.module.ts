import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './components';
import { HomeLoginComponent } from './home-login.component';


@NgModule({
  declarations: [
    LoginComponent,
    HomeLoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
