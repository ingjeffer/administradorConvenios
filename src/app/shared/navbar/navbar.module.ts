import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { GestorRoutingModule } from '@modules/gestor/gestor-routing.module';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    GestorRoutingModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule { }
