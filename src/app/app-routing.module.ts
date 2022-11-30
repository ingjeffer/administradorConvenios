import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@core/guards';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('@modules/login/login.module').then((m) => m.LoginModule) },
  { path: '', canActivate: [LoginGuard], loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
