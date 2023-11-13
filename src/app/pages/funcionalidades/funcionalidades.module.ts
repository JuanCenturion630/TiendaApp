import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FuncionalidadesPageRoutingModule } from './funcionalidades-routing.module';

import { FuncionalidadesPage } from './funcionalidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FuncionalidadesPageRoutingModule
  ],
  declarations: [FuncionalidadesPage]
})
export class FuncionalidadesPageModule {}
