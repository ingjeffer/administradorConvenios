import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@core/guards';
import { NavigatePath } from './constants';

const routes: Routes = [
  { path: NavigatePath.Login, loadChildren: () => import('@modules/login/login.module').then((m) => m.LoginModule) },
  { path: NavigatePath.Dashboard, canActivate: [LoginGuard], loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule) },
  { path: NavigatePath.Default, redirectTo: NavigatePath.Login }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
