import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroFinalizadoDatosPage } from './registro-finalizado-datos.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroFinalizadoDatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroFinalizadoDatosPageRoutingModule {}
