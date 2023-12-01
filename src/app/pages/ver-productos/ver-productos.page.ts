import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage {

  sesion:any;
  constructor(private router:Router, private auth:AuthService, private producto:ProductoService) {
    this.sesion=auth.obtenerResultadoSesion();
    console.log("Sesión: ",this.sesion);
    console.log("idTienda: ",this.sesion.stores[0].id);
    this.verProductos();
  }

  irAAgregarProductos() {
    this.router.navigate(['/agregar-producto']);
  }

  hayProductos:boolean=false;
  listaProductos:any;
  /**
   * 
   */
  verProductos() {
    this.producto.obtenerProductosPorTienda(this.sesion.stores[0].id).subscribe({
      next: (r) => {
        console.log("Resultado: ",r);
        this.listaProductos=r;
        if(this.listaProductos.length>0) {
          this.hayProductos=true;
        }
      },
      error: (e) => {
        console.log("Ocurrió un error al cargar los productos de su tienda.");
      }
    })
  }
}
