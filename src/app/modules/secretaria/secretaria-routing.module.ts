import { SecretariaComponent } from './secretaria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarConveniosComponent } from './components';

const routes: Routes = [{
  path: '',
  component: SecretariaComponent,
  children: [
    { path: '', component: ListarConveniosComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretariaRoutingModule { }
