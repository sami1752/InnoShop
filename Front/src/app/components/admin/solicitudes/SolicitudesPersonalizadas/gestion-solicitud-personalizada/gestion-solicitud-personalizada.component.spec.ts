import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSolicitudPersonalizadaComponent } from './gestion-solicitud-personalizada.component';

describe('GestionSolicitudPersonalizadaComponent', () => {
  let component: GestionSolicitudPersonalizadaComponent;
  let fixture: ComponentFixture<GestionSolicitudPersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSolicitudPersonalizadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSolicitudPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
