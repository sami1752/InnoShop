import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarSolicitudPErsonalizadaComponent } from './registrar-solicitud-personalizada.component';

describe('RegistrarSolicitudPErsonalizadaComponent', () => {
  let component: RegistrarSolicitudPErsonalizadaComponent;
  let fixture: ComponentFixture<RegistrarSolicitudPErsonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarSolicitudPErsonalizadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarSolicitudPErsonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
