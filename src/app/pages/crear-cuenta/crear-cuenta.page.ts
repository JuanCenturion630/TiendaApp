import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  formCrearCuenta: FormGroup;
  constructor(private router:Router,private parametrosForm: FormBuilder, private login:AuthService, private cargando: LoadingController) {
    this.formCrearCuenta = this.parametrosForm.group({
      nombreUsuario: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{1,50}$/)]], //Valida que el campo sea alfanumérico ([a-zA-Z0-9]) y que tenga entre 1 a 50 carácteres {1,50}.
      email: ['', [Validators.required, Validators.email]], //Valida el formato de correo electrónico.
      password: ['', [Validators.required, Validators.maxLength(50)]], //Valida que el campo tenga máximo 50 letras.
      nombreMarca: ['', [Validators.required, Validators.maxLength(20)]], //Valida que el campo tenga máximo 20 letras.
      telefono: ['', [Validators.pattern(/^[0-9]{11}$/)]], //Valida que el campo tenga solo números y máximo 11. Es opcional, así que no tiene "Validators.required" que lo volvería obligatorio.
      aceptoTerminos: [false, Validators.requiredTrue], //Valida que este botón esté presionado.
    });
  }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  irARegistroFinalizado() {
    if (this.formCrearCuenta.valid) { //Si el formulario está validado...
      const datos = this.formCrearCuenta.value; //Guardo los datos validados...
      console.log('Datos válidos:', datos); //Los muestro en consola...
      //Guardo las respuesta de "login.registrar" en "r"
      const r = this.login.registrar(datos.nombreUsuario,datos.email,datos.password,datos.nombreMarca,datos.telefono);
      this.mostrarBarraDeCarga(); //Muestro barra de carga...
      if(r!=null) { //Si "r" no es nulo... 
        this.ocultarBarraDeCarga(); //Oculto la barra de carga...
        this.router.navigate(['/registro-finalizado']); //Voy a "registro-finalizado"...
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  async mostrarBarraDeCarga() {
    const barraDeCarga = await this.cargando.create({
      message: 'Creando su cuenta...', //Mensaje.
      spinner: 'circular', //Usa el estilo de la barra de carga.
      cssClass: 'custom-loading', //CSS para personalizar.
    });
    await barraDeCarga.present();
  }

  async ocultarBarraDeCarga() {
    await this.cargando.dismiss();
  }
}
