import { Component } from '@angular/core';

import { SupabaseService } from '../supabase.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materia-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './materia-form.component.html',
  styleUrls: ['./materia-form.component.scss']
})
export class MateriaFormComponent {
  materia = {
    N_MATERIA: '',
    PARC_PORC: 0,
    ASIG_PORC: 0,
    ASIST_PORC: 0,
    SEMESTRAL_PORC: 0,
    CORREO_PROFESOR: ''
  };

  constructor(private supabaseService: SupabaseService) {}

  async insertarMateria() {
    try {
      const res = await this.supabaseService.insertMateria(this.materia);
      console.log('Respuesta Supabase:', res);
      alert('Materia registrada exitosamente!');

      // Reiniciar el formulario
      this.materia = {
        N_MATERIA: '',
        PARC_PORC: 0,
        ASIG_PORC: 0,
        ASIST_PORC: 0,
        SEMESTRAL_PORC: 0,
        CORREO_PROFESOR: ''
      };
    } catch (err) {
      console.error('Error al guardar:', err);
      alert('Hubo un error al guardar la materia');
    }
  }
}