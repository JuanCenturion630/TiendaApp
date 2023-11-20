import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-finalizado',
  templateUrl: './registro-finalizado.page.html',
  styleUrls: ['./registro-finalizado.page.scss'],
})
export class RegistroFinalizadoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irARegistroFinalizadoDatos() {
    this.router.navigate(['/registro-finalizado-datos']);
  }
}
