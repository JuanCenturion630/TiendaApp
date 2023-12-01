import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  paginaActual!: string;
  loginExitosoRecibido:any;

  constructor(private router: Router,private auth:AuthService) {
    //Evalúa el cambio entre página y si se realiza con éxito llama al método "quitarParametrosDeURL()".
    this.router.events.subscribe((event) => { 
      if (event instanceof NavigationEnd) {
        this.paginaActual = this.quitarParametrosDeURL(event.url);
        console.log("Página actual:",this.paginaActual);
      }
    });
  }

  /**
   * @function quitarParametrosDeURL - quita los parámetros de la dirección de la página actual en la aplicación.
   * @param {string } url - dirección de la página actual.
   * @returns devuelve la URL de la página actual, pero sin los parámetros.
   */
  private quitarParametrosDeURL(url: string): string {
    this.loginExitosoRecibido=this.auth.obtenerResultadoSesion();
    const urlSinParam = url.split('?'); //Solo toma el url hasta encontrarse con "?"
    return urlSinParam[0];
  }

  /**
   * @function irALogin - lleva a la página de login.
   */
  irALogin() {
    this.router.navigate(['/login']);
  }

  /**
   * @function irAHome - lleva a la página de inicio.
   */
  irAHome() {
    this.router.navigate(['/home']);
  }

  /**
   * @function cerrarSesion - cierra la conexión con el servidor y borra los datos locales asociados.
   */
  cerrarSesion() {
    this.auth.cerrarSesion().subscribe({
      next: (r) => {
        this.loginExitosoRecibido=false;
        this.router.navigate(['/home']);
        document.getElementById('botonLogout')?.click(); //Se presiona el botón como parche porque fue la única opción que sirvió para cambiar el nombre.
      },
      error: (e) => {
        console.log("Error al cerrar sesión");
      }
    })
  }
}
