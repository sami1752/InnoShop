import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSolicitudPersonalizadaComponent } from './detalle-solicitud-personalizada.component';

describe('DetalleSolicitudPersonalizadaComponent', () => {
  let component: DetalleSolicitudPersonalizadaComponent;
  let fixture: ComponentFixture<DetalleSolicitudPersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSolicitudPersonalizadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSolicitudPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
