import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';


import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { ListUserComponent, FormUserComponent } from './components';
import { AdministradorService } from './services';


@NgModule({
  declarations: [
    AdministradorComponent,
    ListUserComponent,
    FormUserComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [
    AdministradorService
  ]
})
export class AdministradorModule { }
