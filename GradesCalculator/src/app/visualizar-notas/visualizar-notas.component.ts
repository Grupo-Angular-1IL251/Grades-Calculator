import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api-service.service';

@Component({
  selector: 'app-visualizar-notas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './visualizar-notas.component.html',
  styleUrls: ['./visualizar-notas.component.scss']
})
export class VisualizarNotasComponent implements OnInit {
  estudiante = {
    nombre: 'Fabricio',
    apellido: 'Mendoza',
    uuid: 'a835d4d7-320b-43dc-92e3-05e95d56aa62'
  };

  materias: { nombre: string; notas: any }[] = [];
  cargando = false;
  error = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerMateriasYNotas();
  }

  obtenerMateriasYNotas() {
    this.cargando = true;
    this.apiService.obtenerMaterias(this.estudiante.uuid).subscribe({
      next: (res) => {
        const materias: string[] = res.data;

        const peticiones = materias.map(nombre =>
          this.apiService.obtenerNotasPorMateria(this.estudiante.uuid, nombre)
            .toPromise()
            .then(notas => ({
              nombre,
              notas: notas.data
            }))
        );

        Promise.all(peticiones).then(resultados => {
          this.materias = resultados;
          this.cargando = false;
        }).catch(err => {
          console.error('Error al obtener notas:', err);
          this.error = 'No se pudieron cargar las notas';
          this.cargando = false;
        });
      },
      error: (err) => {
        console.error('Error al obtener materias:', err);
        this.error = 'No se pudieron cargar las materias';
        this.cargando = false;
      }
    });
  }

  getColor(nota: number): string {
    if (nota >= 85) return 'alto';
    if (nota >= 70) return 'medio';
    return 'bajo';
  }

  getPromedio(lista: number[]): number | null {
    if (!lista || lista.length === 0) return null;
    const total = lista.reduce((acc, val) => acc + val, 0);
    return Math.round(total / lista.length);
  }
}
