import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  public url: string = "https://folk-and-kin.onrender.com/api/v1/folkandkin/categories";

  constructor(private auth: AuthService, private http: HttpClient) { }

  /**
   * @function obtenerCategorias - Obtiene todas las categorias.
   * @returns Observable<any[]>: Retorna un vector. any: Ver documentacion de endpoints.
   */
  obtenerCategorias(): Observable<any[]>{
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url, {headers});
  }

  /**
   * @function crearCategoria - Crea una nueva categoria.
   * @param name {string} - nombre de la nueva categoria. Requerido.
   * @returns Observable<any>: any: Ver documentacion de endpoints.
   */
  crearCategoria(name: string): Observable<any>{
    let categoria = {
      "name": name
    }

    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url, categoria, {headers});
  }
}