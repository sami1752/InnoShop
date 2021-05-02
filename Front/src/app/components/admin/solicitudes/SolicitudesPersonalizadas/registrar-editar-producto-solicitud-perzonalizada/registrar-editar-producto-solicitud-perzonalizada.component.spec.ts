import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarEditarProductoSolicitudPerzonalizadaComponent } from './registrar-editar-producto-solicitud-perzonalizada.component';

describe('RegistrarEditarProductoSolicitudPerzonalizadaComponent', () => {
  let component: RegistrarEditarProductoSolicitudPerzonalizadaComponent;
  let fixture: ComponentFixture<RegistrarEditarProductoSolicitudPerzonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarEditarProductoSolicitudPerzonalizadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarEditarProductoSolicitudPerzonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
