import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent {
  formularioNotas: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioNotas = this.fb.group({
      materia: ['', Validators.required],
      parciales: [40, [Validators.required, Validators.min(0), Validators.max(100)]],
      asignaciones: [40, [Validators.required, Validators.min(0), Validators.max(100)]],
      asistencia: [20, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  enviarFormulario() {
    if (this.formularioNotas.valid) {
      console.log('Formulario enviado:', this.formularioNotas.value);
    } else {
      alert('Completa todos los campos correctamente.');
    }
  }

  regresar() {
    history.back(); 
  }
}
