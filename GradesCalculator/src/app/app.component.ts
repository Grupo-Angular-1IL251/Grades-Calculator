import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MateriaFormComponent } from './materia-form/materia-form.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MateriaFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GradesCalculator';
}
