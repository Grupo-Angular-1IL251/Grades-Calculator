import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAgregarComponent } from './menu-agregar.component';

describe('MenuAgregarComponent', () => {
  let component: MenuAgregarComponent;
  let fixture: ComponentFixture<MenuAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuAgregarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
