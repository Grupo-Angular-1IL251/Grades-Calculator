import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  ValidationErrors,
  AbstractControl,
  ValidatorFn
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api-service.service';


// Validador personalizado: suma de porcentajes debe ser 100
export function porcentajeTotalValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const parciales = Number(form.get('parciales')?.value || 0);
    const asignaciones = Number(form.get('asignaciones')?.value || 0);
    const portafolio = Number(form.get('portafolio')?.value || 0);
    const semestral = Number(form.get('semestral')?.value || 0);
    const total = parciales + asignaciones + portafolio + semestral;
    return total === 100 ? null : { porcentajeInvalido: true };
  };
}

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent {
  formularioNotas: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.formularioNotas = this.fb.group(
      {
        materia: ['', Validators.required],
        parciales: [40, [Validators.required, Validators.min(0), Validators.max(100)]],
        cantidad_parciales: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
        asignaciones: [30, [Validators.required, Validators.min(0), Validators.max(100)]],
        cantidad_asignaciones: [1, [Validators.required, Validators.min(1), Validators.max(30)]],
        portafolio: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
        semestral: [10, [Validators.required, Validators.min(0), Validators.max(100)]]
      },
      { validators: porcentajeTotalValidator() }
    );
  }

  enviarFormulario() {
  this.formularioNotas.markAllAsTouched();

  const materia = this.formularioNotas.get('materia')?.value?.trim();
  if (!materia) {
    this.formularioNotas.get('materia')?.setErrors({ required: true });
    return;
  }

  if (this.formularioNotas.errors?.['porcentajeInvalido']) {
    return;
  }

  if (this.formularioNotas.valid) {
    this.loading = true;

    const payload = {
      nombre_materia: materia,
      porc_parciales: this.formularioNotas.value.parciales,
      cant_parciales: this.formularioNotas.value.cantidad_parciales,
      porc_asig: this.formularioNotas.value.asignaciones,
      cant_asig: this.formularioNotas.value.cantidad_asignaciones,
      porc_portafolio: this.formularioNotas.value.portafolio,
      porc_semestral: this.formularioNotas.value.semestral,
      uuid_estudiante: 'a835d4d7-320b-43dc-92e3-05e95d56aa62'  // TO DO
    };

    this.apiService.registrarMateria(payload).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
        alert('Materia registrada correctamente.');
        this.formularioNotas.reset();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al registrar:', error);
        alert('Error al registrar la materia.');
        this.loading = false;
      }
    });
  }
}


  regresar() {
    history.back();
  }
  

}
