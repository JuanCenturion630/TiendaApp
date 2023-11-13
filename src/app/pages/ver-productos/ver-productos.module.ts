import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerProductosPageRoutingModule } from './ver-productos-routing.module';

import { VerProductosPage } from './ver-productos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerProductosPageRoutingModule
  ],
  declarations: [VerProductosPage]
})
export class VerProductosPageModule {}
