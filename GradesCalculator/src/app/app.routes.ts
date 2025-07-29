import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MateriasComponent } from './materias/materias.component';
import { VisualizarNotasComponent } from './visualizar-notas/visualizar-notas.component';


export const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'visualizar-notas', component: VisualizarNotasComponent }, 
  { path: '**', redirectTo: '/signup' }               
];
