import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-finalizado-datos',
  templateUrl: './registro-finalizado-datos.page.html',
  styleUrls: ['./registro-finalizado-datos.page.scss'],
})
export class RegistroFinalizadoDatosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irAFuncionalidades() {
    this.router.navigate(['/funcionalidades']);
  }
}
