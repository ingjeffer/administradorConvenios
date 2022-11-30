import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AdministradorModule } from '@modules/administrador/administrador.module';
import { NavbarModule } from '@shared/navbar';
import { FooterModule } from '@shared/footer';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdministradorModule,
    NavbarModule,
    FooterModule,
  ]
})
export class DashboardModule { }
