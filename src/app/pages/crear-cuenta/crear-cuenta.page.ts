import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage {

  formCrearCuenta: FormGroup; //Formulario reactivo.
  constructor(private router:Router, private parametrosForm:FormBuilder, private cuenta:AuthService, private toast:ToastController,private alerta:AlertController) {
    this.formCrearCuenta = this.parametrosForm.group({
      nombreUsuario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,50}$/)]], //Valida que el campo sea alfanumérico ([a-zA-Z0-9]) y que tenga entre 1 a 50 carácteres {1,50}.
      email: ['', [Validators.required, Validators.email]], //Valida el formato de correo electrónico.
      password: ['', [Validators.required, Validators.maxLength(50)]], //Valida que el campo tenga máximo 50 caracteres.
      nombreMarca: ['', [Validators.required, Validators.maxLength(20)]], //Valida que el campo tenga máximo 20 caracteres.
      telefono: ['', [Validators.pattern(/^[0-9]{11}$/)]], //Valida que el campo tenga solo números y máximo 11. Es opcional, así que no tiene "Validators.required" que lo volvería obligatorio.
      aceptoTerminos: [false, Validators.requiredTrue], //Valida que este botón esté presionado.
    });
  }

  /**
   * @function irAHome - lleva a la página de inicio.
   */
  irAHome() {
    this.router.navigate(['/home']);
  }

  /**
   * @function irALogin - lleva a la página de login.
   */
  irALogin() {
    this.router.navigate(['/login']);
  }

  /**
   * @function irAFuncionalidades - valida los datos del formulario y llama al método "registrar" de AuthService
   * para crear una cuenta de usuario en la base de datos y luego redirige a la página "funcionalidades".
   */
  irAFuncionalidades() {
    if (this.formCrearCuenta.valid) { //Si el formulario está validado entonces...
      var flujoNormal=false;
      const datos=this.formCrearCuenta.value; //Guardo los datos validados.
      console.log('Datos válidos:', datos); //Los muestro en consola.
      this.cuenta.registrar(datos.nombreUsuario,datos.email,datos.password,datos.nombreMarca,datos.telefono).subscribe({
        next: (r) => {
          console.log("Respuesta: ",r);
          this.registroExitoso(); //Invoco un toast indicando el éxito en la operación.
          this.router.navigate(['/funcionalidades']); //Voy a página "funcionalidades".
          flujoNormal=true;
        },
        error: (e) => {
          console.log("Error: ",e);
          if(e.error.message.includes("query did not return a unique result")) {
            this.registroFallido("Esta cuenta ya fue creada.");
          }
          else {
            this.registroFallido("No se pudo crear la cuenta.");
          }
        },
        complete: () => { //"complete" se ejecuta después del "next" o "error".
          if(!flujoNormal) { //Si "flujoNormal" está en false, significa que nunca entró en "next" porque no hubo conexión con el servidor.
            this.servidorCaido();
          }
        }
      });
    } else {
      console.log('Formulario no válido.');
    }
  }

  /**
   * @function registroExitoso - crea un cartel en el centro de la pantalla notificando el éxito del registro.
   */
  async registroExitoso() {
    const cartel = await this.toast.create({
      message: "Se creó la cuenta con éxito.",
      duration: 5000,
      position: 'middle',
      color: 'success',
      icon: 'checkmark-circle-outline',
    });
    cartel.present();
  }

  /**
   * @function registroFallido - crea un cartel en el centro de la pantalla notificando un error al registrarse.
   * @param mensaje - mensaje de error que se le muestra al usuario.
   */
  async registroFallido(mensaje:string) {
    const cartel = await this.toast.create({
      message: mensaje,
      duration: 5000,
      position: 'middle',
      color: 'danger',
      icon: 'warning-outline',
    });
    cartel.present();
  }

  /**
   * @function servidorCaido - notifica que se cayó el servidor.
   */
  async servidorCaido() {
    const alert = await this.alerta.create({
      header: 'Servidor caído',
      message: 'No se pudo comunicar con el servidor. :(',
      backdropDismiss: true, //Cierra la alerta al hacer click fuera de ella.
      cssClass: '',
      buttons: [
        {
          text: 'Recargar',
          cssClass: '',
          handler: () => {
            this.router.navigate(['/crear-cuenta']); //Reinicia la página.
          },
        },
      ],
    });
    await alert.present();
  }
}
