import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.page.html',
  styleUrls: ['./ver-productos.page.scss'],
})
export class VerProductosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  irAAgregarProductos() {
    this.router.navigate(['/agregar-producto']);
  }
}
