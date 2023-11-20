import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olvide-password',
  templateUrl: './olvide-password.page.html',
  styleUrls: ['./olvide-password.page.scss'],
})
export class OlvidePasswordPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  irAHome() {
    this.router.navigate(['/home']);
  }
  
  irALogin() {
    this.router.navigate(['/login']);
  }
}
