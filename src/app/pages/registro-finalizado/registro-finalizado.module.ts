import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroFinalizadoPageRoutingModule } from './registro-finalizado-routing.module';

import { RegistroFinalizadoPage } from './registro-finalizado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroFinalizadoPageRoutingModule
  ],
  declarations: [RegistroFinalizadoPage]
})
export class RegistroFinalizadoPageModule {}
