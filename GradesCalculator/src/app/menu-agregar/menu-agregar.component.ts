import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-agregar',
  imports: [],
  templateUrl: './menu-agregar.component.html',
  styleUrl: './menu-agregar.component.scss'
})
export class MenuAgregarComponent {
    constructor(private router: Router) {}

    irAMaterias() {
    this.router.navigate(['/materias']);
  }
    irANotas() {
    this.router.navigate(['/agregar-notas']);
  }
    irADashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    this.router.navigate(['/login']);
  }

}
