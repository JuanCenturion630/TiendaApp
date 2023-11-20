import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.page.html',
  styleUrls: ['./crear-cuenta.page.scss'],
})
export class CrearCuentaPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  irARegistroFinalizado() {
    this.router.navigate(['/registro-finalizado']);
  }
}
