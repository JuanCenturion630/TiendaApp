import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroFinalizadoPage } from './registro-finalizado.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroFinalizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroFinalizadoPageRoutingModule {}
