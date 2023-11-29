import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  public url: string = "https://folk-and-kin.onrender.com/api/v1/folkandkin/products";

  constructor(private auth: AuthService, private http: HttpClient) { }

  /**
   * @function obtenerProductos - Obtiene todos los productos de todas las tiendas.
   * NOTA: Me parece que no va a hacer falta usar este metodo.
   * @returns Observable<any[]> - Retorna un vector. any: Ver documentacion de endpoints.
   */
  obtenerProductos(): Observable<any[]>{
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url, {headers});
  }

  /**
   * @function obtenerProductosPorTienda - Obtiene todos los productos de una tienda.
   * @param storeId - ID de la tienda que desea obtener sus productos.
   * @returns Observable<any[]> - Retorna un vector. any: Ver documentacion de endpoints.
   */
  obtenerProductosPorTienda(storeId: number): Observable<any[]>{
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.url + `/${storeId}`, {headers});
  }

  /**
   * @function crearProducto - Crea un producto para una tienda.
   * @param name {string} - nombre del producto nuevo. Requerido.
   * @param description {string} - descripcion del producto nuevo. Requerido.
   * @param price {string} - precio del producto nuevo. Tiene que ser un string, el backend se encarga de convertirlo. Requerido.
   * @param storeId {number} - ID de la tienda en donde desea crear el producto nuevo. Requerido.
   * @param photos {File[]} - vector con las fotos del producto nuevo. No estoy seguro si tiene que ser del tipo 
   * File. Hay que ir probando. Requerido. No puede ser nulo pero si lo mandas como un vector vacio [], te crea
   * el producto pero sin fotos.
   * @param categoriesId {number[]} - IDs de las categorias del nuevo producto. Requerido.
   * @param stock {number} - Stock del nuevo producto. Opcional. Si el producto tiene variantes (talles y/o colores),
   * este stock debería de ser null pero si lo mandas con un valor, no daría error.
   * @param colors { {stock: number, colorId: number}[] } - Colores del nuevo producto. Opcional. Si no tendra
   * colores el nuevo producto, mandarlo como null. Cada elemento tiene stock (el stock de ese color de producto)
   * y colorId (ID del color).
   * @param sizes { {stock: number, sizeId: number}[] } - Talles del nuevo producto. Opcional. Si no tendra
   * talles el nuevo producto, mandarlo como null. Cada elemento tiene stock (el stock de ese talle de producto)
   * y sizeId (ID del talle).
   * @returns Observable<any>: any: Ver documentacion de endpoints.
   */
  crearProducto(name: string, description: string, price: string, storeId: number, 
    photos: File[], categoriesId: number[], 
    stock?: number, 
    colors?: {stock: number, colorId: number}[], 
    sizes?: {stock: number, sizeId: number}[]): Observable<any>{
    if(!photos){
      photos = [];
    }
    
    let producto = {
      "name": name,
      "description": description,
      "price": price,
      "storeId": storeId,
      "photos": photos,
      "categoriesId": categoriesId,
      "stock": stock,
      "colors": colors,
      "sizes": sizes
    }
    
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(this.url, producto, {headers});
  }

  guardarFoto(photo: FormData, productId: number): Observable<any>{
    let token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(this.url+ `/${productId}/photos`, photo, {headers});
  }
}