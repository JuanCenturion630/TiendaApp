import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearCuentaPageRoutingModule } from './crear-cuenta-routing.module';
import { CrearCuentaPage } from './crear-cuenta.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearCuentaPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CrearCuentaPage]
})
export class CrearCuentaPageModule {}
