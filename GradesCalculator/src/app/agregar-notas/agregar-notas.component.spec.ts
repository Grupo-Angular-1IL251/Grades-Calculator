import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarNotasComponent } from './agregar-notas.component';

describe('AgregarNotasComponent', () => {
  let component: AgregarNotasComponent;
  let fixture: ComponentFixture<AgregarNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarNotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
