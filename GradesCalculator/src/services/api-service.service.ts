import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8000';  

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  registrarMateria(data: any): Observable<any> {
    return this.http.post(`${API_URL}/registrar-materia`, data);
  }

  registrarNota(data: any): Observable<any> {
    return this.http.post(`${API_URL}/registrar-nota`, data);
  }

  obtenerMaterias(uuid_estudiante: string): Observable<any> {
    return this.http.post(`${API_URL}/obtener-materias`, { uuid_estudiante });
  }

  obtenerNotasPorMateria(uuid_estudiante: string, nombre_materia: string): Observable<any> {
    return this.http.post(`${API_URL}/obtener-notas-por-materia`, {
      uuid_estudiante,
      nombre_materia
    });
  }
}
