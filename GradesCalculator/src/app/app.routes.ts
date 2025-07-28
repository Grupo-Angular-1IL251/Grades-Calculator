import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriasComponent } from './materias/materias.component';
import { AgregarNotasComponent } from './agregar-notas/agregar-notas.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'materias', component: MateriasComponent }, 
  { path: 'agregar-notas', component: AgregarNotasComponent },
  { path: '**', redirectTo: '/signup' }               
];
