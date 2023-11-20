import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroFinalizadoDatosPageRoutingModule } from './registro-finalizado-datos-routing.module';

import { RegistroFinalizadoDatosPage } from './registro-finalizado-datos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroFinalizadoDatosPageRoutingModule
  ],
  declarations: [RegistroFinalizadoDatosPage]
})
export class RegistroFinalizadoDatosPageModule {}
