import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@shared/material';


import { AdministradorRoutingModule } from './administrador-routing.module';
import { AdministradorComponent } from './administrador.component';
import { FormUserComponent, ListUserComponent } from './components';
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
    MaterialModule,
  ],
  providers: [
    AdministradorService
  ]
})
export class AdministradorModule { }
