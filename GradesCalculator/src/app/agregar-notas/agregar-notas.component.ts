import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-agregar-notas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './agregar-notas.component.html',
  styleUrls: ['./agregar-notas.component.scss']
})
export class AgregarNotasComponent implements OnInit {
  public materias: string[] = [];
  public tipoNota: string[] = ["PARCIAL", "ASIGNACION", "PORTAFOLIO", "SEMESTRAL"];
  uuid_estudiante = 'a835d4d7-320b-43dc-92e3-05e95d56aa62';

  formulario!: FormGroup; // 🆕 Agregado para formulario reactivo
  loading = false;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder // 🆕 Constructor actualizado
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({ // 🆕 Inicialización del formulario
      materia: ['', Validators.required],
      tipoNota: ['', Validators.required],
      nota: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.apiService.obtenerMaterias(this.uuid_estudiante).subscribe((response: any) => {
      this.materias = response.data;
    });
  }

  regresar(): void {
    history.back();
  }

  enviarFormulario(): void { // 🆕 Método de envío con conexión a la API
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) return;

    const payload = {
      uuid_estudiante: this.uuid_estudiante,
      nombre_materia: this.formulario.value.materia,
      nota: this.formulario.value.nota,
      tipo_nota: this.formulario.value.tipoNota.toLowerCase()
    };

    this.loading = true;

    this.apiService.registrarNota(payload).subscribe({
      next: (res) => {
        alert(res.mensaje || 'Nota registrada exitosamente.');
        this.loading = false;
        this.formulario.reset();
      },
      error: (err) => {
        console.error('Error al registrar nota:', err);
        alert('Error al registrar la nota.');
        this.loading = false;
      }
    });
  }
}
