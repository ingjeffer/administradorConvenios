import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretariaRoutingModule } from './secretaria-routing.module';
import { SecretariaComponent } from './secretaria.component';
import { DetalleComponent, GestionSecretariaComponent, ListarConveniosComponent } from './components';
import { MaterialModule } from '@shared/material';
import { GestorService } from '@modules/gestor/services';


@NgModule({
  declarations: [
    ListarConveniosComponent,
    GestionSecretariaComponent,
    SecretariaComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    SecretariaRoutingModule,
    MaterialModule
  ],
  providers: [
    GestorService,
  ],
})
export class SecretariaModule { }
