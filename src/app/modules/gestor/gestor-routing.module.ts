import { ListGestorComponent } from './components/list-gestor/list-gestor.component';
import { GestorComponent } from './gestor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GestorComponent,
    children: [
      { path: '', component: ListGestorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestorRoutingModule { }
