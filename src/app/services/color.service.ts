import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  public url: string = "https://folk-and-kin.onrender.com/api/v1/folkandkin/colors";

  constructor(private auth: AuthService, private http: HttpClient) { }

  /**
   * @function obtenerColores - Obtiene todos los colores.
   * @returns Observable<any[]> - Retorna un vector. any: Ver documentacion de endpoints.
   */
  obtenerColores(): Observable<any[]>{
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url, {headers});
  }

  /**
   * @function crearColor - Crea un nuevo color.
   * @param name {string} - nombre del nuevo color. Requerido.
   * @param hexadecimalCode {string} - codigo hexadecimal del nuevo color. Requerido.
   * @returns Observable<any> - any: Ver documentacion de endpoints.
   */
  crearColor(name: string, hexadecimalCode: string): Observable<any>{
    let color = {
      "name": name,
      "hexadecimalCode": hexadecimalCode
    }
    
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url, color, {headers});
  }
}