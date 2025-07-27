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

  constructor(private fb: FormBuilder) {
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
      console.log('Datos del formulario:', this.formularioNotas.value);
      alert('Formulario válido. Listo para enviar.');
      this.formularioNotas.reset();
    }
  }

  regresar() {
    history.back();
  }
  

}
