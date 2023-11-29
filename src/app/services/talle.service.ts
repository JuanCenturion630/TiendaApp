import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TalleService {
  public url: string = "https://folk-and-kin.onrender.com/api/v1/folkandkin/sizes";

  constructor(private auth: AuthService, private http: HttpClient) { }

  /**
   * @function obtenerTalles - Obtiene todos los talles.
   * @returns Observable<any[]> - Retorna un vector. any: Ver documentacion de endponts.
   */
  obtenerTalles(): Observable<any[]>{
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url, {headers});
  }

  /**
   * @function crearTalle - Crea un nuevo talle. Nota: Al crear un nuevo talle, se le asigna el estandar "Personalizados"
   * por defecto.
   * @param name {string} - Nombre del talle. Requerido.
   * @returns Observable<any> - any: Ver documentacion de endpoints.
   */
  crearTalle(name: string): Observable<any>{
    let talle = {
      "name": name
    }
    
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url, talle, {headers});
  }
}