import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'admin', loadChildren: () => import('@modules/administrador/administrador.module').then((m) => m.AdministradorModule) },
      { path: 'gestor', loadChildren: () => import('@modules/gestor/gestor.module').then((m) => m.GestorModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
