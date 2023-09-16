import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigatePath } from '@const/navigate';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: NavigatePath.Dashboard, component: DashboardComponent,
    children: [
      { path: NavigatePath.Admin, loadChildren: () => import('@modules/administrador/administrador.module').then((m) => m.AdministradorModule) },
      { path: NavigatePath.Gestor, loadChildren: () => import('@modules/gestor/gestor.module').then((m) => m.GestorModule) },
      { path: NavigatePath.Secretaria, loadChildren: () => import('@modules/secretaria/secretaria.module').then((m) => m.SecretariaModule) },
      { path: NavigatePath.DirectorRelex, loadChildren: () => import('@modules/secretaria/secretaria.module').then((m) => m.SecretariaModule) },
      { path: NavigatePath.ConsejoAcademico, loadChildren: () => import('@modules/secretaria/secretaria.module').then((m) => m.SecretariaModule) },
      { path: NavigatePath.Vicerrectoria, loadChildren: () => import('@modules/secretaria/secretaria.module').then((m) => m.SecretariaModule) },
      { path: NavigatePath.DirJuridico, loadChildren: () => import('@modules/secretaria/secretaria.module').then((m) => m.SecretariaModule) },
      { path: NavigatePath.Rectoria, loadChildren: () => import('@modules/secretaria/secretaria.module').then((m) => m.SecretariaModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
