import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerProductosPage } from './ver-productos.page';

const routes: Routes = [
  {
    path: '',
    component: VerProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerProductosPageRoutingModule {}
