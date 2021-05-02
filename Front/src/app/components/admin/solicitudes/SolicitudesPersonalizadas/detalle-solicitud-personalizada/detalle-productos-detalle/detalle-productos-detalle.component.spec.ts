import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductosDetalleComponent } from './detalle-productos-detalle.component';

describe('DetalleProductosDetalleComponent', () => {
  let component: DetalleProductosDetalleComponent;
  let fixture: ComponentFixture<DetalleProductosDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleProductosDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleProductosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
