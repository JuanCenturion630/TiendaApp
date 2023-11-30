import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formLogin: FormGroup; //Formulario reactivo.
  constructor(private router:Router, private parametrosForm:FormBuilder, private cuenta:AuthService, private toast:ToastController,private alerta:AlertController) { 
    this.formLogin = this.parametrosForm.group({
      email: ['', [Validators.required, Validators.email]], //Valida el formato de correo electrónico.
      password: ['', [Validators.required, Validators.maxLength(50)]], //Valida que el campo tenga máximo 50 caracteres.
    });
  }

  /**
   * @function irAHome - redirige a la página de inicio.
   */
  irAHome() {
    this.router.navigate(['/home']);
  }

  /**
   * @function irAFuncionalidades - valida los datos del formulario y llama al método "iniciarSesion" de 
   * AuthService para acceder a un usuario en la base de datos y luego redirige a la página "funcionalidades".
   */
  irAFuncionalidades() {
    if (this.formLogin.valid) { //Si el formulario está validado entonces...
      var flujoNormal=false;
      const datos = this.formLogin.value; //Guardo los datos validados.
      console.log('Datos válidos:', datos); //Los muestro en consola.
      this.cuenta.iniciarSesion(datos.email,datos.password).subscribe({
        next: (r) => {
          console.log("Respuesta: ",r);
          this.registroExitoso(); //Invoco un toast indicando el éxito en la operación.
          this.router.navigate(['/funcionalidades']); //Voy a página "funcionalidades".
          flujoNormal=true;
        },
        error: (e) => {
          console.log("Error: ",e);
          if(e.error.message.includes("Bad credentials") || e.error.message.includes("No existe usuario con")) {
            this.registroFallido("Usuario o contraseña incorrectos.");
          }
          else { 
            if(e.error.message.includes("Validaciones")) {
              this.registroFallido("Contraseña con menos de 8 caracteres.");
            }
            else {
              this.registroFallido("No se pudo iniciar sesión.");
            }
          }
        },
        complete: () => { //"complete" se ejecuta sino entra ni en "next" ni "error".
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
      message: "Se inició sesión con éxito.",
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
            this.router.navigate(['/login']); //Reinicia la página.
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * @function irAOlvidePassword - dirige a la página de recuperación de contraseña.
   */
  irAOlvidePassword() {
    this.router.navigate(['/olvide-password']);
  }

  /**
   * @function irACrearCuenta - dirige a la página de creación de cuenta.
   */
  irACrearCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }
}
