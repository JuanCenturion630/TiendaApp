import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string = "https://folk-and-kin.onrender.com/api/v1/folkandkin";
  private token: string = '';

  constructor(private http: HttpClient) { }
  private resultadoSesion: any; //Variable para almacenar los datos de sesión.

  /**
   * @function iniciarSesion - Permite inicar sesion al usuario y guardar el token en localstorage.
   * @param email {string} - email de usuario. Requerido.
   * @param password {string} - contrasenia del usuario. Minimo 8 caracteres. Requerido.
   * @returns Observable<any> - any: Ver documetacion de endpoints.
   */
  iniciarSesion(email: string, password: string): Observable<any>{
    let credenciales = {
      "email": email,
      "password": password
    }
    return this.http.post<any>(this.url + "/auth/login", credenciales).pipe(
      tap(respuesta => {
        this.guardarToken(respuesta.token);
        this.resultadoSesion=respuesta; //Guarda el objeto respuesta, con la propiedad idTienda.
      })
    );
  }

  /**
   * @function obtenerResultadoSesion - setter para enviar el objeto resultadoSesión a otras páginas.
   */
  obtenerResultadoSesion(): any {
    return this.resultadoSesion;
  }


  /**
   * @function registrar - Permite crear un usuario nuevo y ya le inicia la sesion automaticamente. Tambien
   * guarda el token en localstorage.
   * @param username {string} - nombre de usuario. Requerido.
   * @param email {string} - email del usuario. Requerido.
   * @param password {string} - contrasenia del usuario. Minimo 8 caracteres. Requerido.
   * @param storeNanme {string} - nombre de la tienda del usuario. Requerido.
   * @param phone {string} - Telefono del usuario. Opcional. Si no ingresa telefono, mandarlo como null.
   * @returns Observable<any> - any: Ver documentacion de endpoints.
   */
  registrar(username: string, email: string, password: string, storeNanme: string, phone?: string): Observable<any>{
    let user = {
      "username": username,
      "email": email,
      "password": password,
      "storeName": storeNanme,
      "phone": phone
    }
    return this.http.post<any>(this.url + "/auth/register", user).pipe(
      tap(respuesta => {
        this.guardarToken(respuesta.token);
        this.resultadoSesion=respuesta; //Guarda el objeto respuesta, con la propiedad idTienda.
      })
    );
  }

  /**
   * @function cerrarSesion - Cierra la sesion del usuario y borra el token del localstorage.
   * @returns Observable<any> - any: Ver documentacion de endpoints.
   */
  cerrarSesion(): Observable<any>{
    localStorage.removeItem('token');
    return this.http.post<any>(this.url + "/auth/logout",{});
  }

  /**
   * @function cambiarContrasenia - Cambia la contrasenia anterior, por una nueva.
   * @param oldPassword {string} - contrasenia antigua del usuario. Requerido.
   * @param newPassword {string} - contrasenia nueva del usuario. Requerido.
   * @returns Observable<any> - any: Ver documentacio de endpoints.
   */
  cambiarContrasenia(oldPassword: string, newPassword: string): Observable<any>{
    let contrasenias = {
      "oldPassword": oldPassword,
      "newPassword": newPassword
    }
    return this.http.patch<any>(this.url + "/users/change-password", contrasenias);
  }

  /**
   * @function guardarToken - Guarda el token en el localstorage. 
   * Es de uso interno de esta clase (por eso es private).
   * @param token {string} - token a guardar.
   */
  private guardarToken(token: string): void{
    localStorage.setItem('token', token);
    this.token = token;
  }

  /**
   * @function getToken - Si atributo token es null/undefined/vacio, obtiene el token guardado del localstorage.
   * En caso de que no sea asi, retorna el atributo token.
   * Es de uso para los demas servicios.
   * @returns string - Retorna el token del usuario logueado.
   */
  getToken(): string{
    if(this.token === null || this.token === undefined || this.token === ''){
      this.token = localStorage.getItem('token') || "";
    }
    return this.token;
  }
}