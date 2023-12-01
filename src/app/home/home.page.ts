import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router, private navCtrl:NavController) {}

  correo:string='';
  /**
   * @function irACrearCuenta - redirige a la página crear cuenta con un correo escrito en la página de inicio.
   */
  irACrearCuenta() {
    this.navCtrl.navigateForward(`/crear-cuenta/${encodeURIComponent(this.correo)}`);
  }

  /**
   * @function capturarCorreo - captura el texto colocado en el ion-input de la página de inicio.
   * @param event - evento personalizado.
   */
  capturarCorreo(event:CustomEvent) {
    this.correo = (event.target as HTMLInputElement).value;
  }
}