import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router, login:AuthService) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }

  irAFuncionalidades() {
    
    this.router.navigate(['/funcionalidades']);
  }

  irAOlvidePassword() {
    this.router.navigate(['/olvide-password']);
  }

  irACrearCuenta() {
    this.router.navigate(['/crear-cuenta']);
  }
}
