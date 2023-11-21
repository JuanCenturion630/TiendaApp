import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionalidades',
  templateUrl: './funcionalidades.page.html',
  styleUrls: ['./funcionalidades.page.scss'],
})
export class FuncionalidadesPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAAgregarProducto() {
    this.router.navigate(['/agregar-producto']);
  }

  irAVerProductos() {
    this.router.navigate(['/ver-productos']);
  }
}
