import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarDetalleProductoSolicitudComponent } from './listar-detalle-producto-solicitud.component';

describe('ListarDetalleProductoSolicitudComponent', () => {
  let component: ListarDetalleProductoSolicitudComponent;
  let fixture: ComponentFixture<ListarDetalleProductoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarDetalleProductoSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDetalleProductoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
