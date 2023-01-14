import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@shared/material/material.module';

import { GestorRoutingModule } from './gestor-routing.module';
import { GestorComponent } from './gestor.component';
import { FormGestorComponent, ListGestorComponent } from './components';
import { GestorService } from './services';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    GestorComponent,
    ListGestorComponent,
    FormGestorComponent
  ],
  imports: [
    CommonModule,
    GestorRoutingModule,
    FormsModule,
    MaterialModule
  ],
  providers: [
    GestorService,
  ],
})
export class GestorModule { }
