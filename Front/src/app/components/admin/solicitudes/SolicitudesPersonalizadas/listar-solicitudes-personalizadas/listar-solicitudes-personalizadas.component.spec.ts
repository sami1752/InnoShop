import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSolicitudesPersonalizadasComponent } from './listar-solicitudes-personalizadas.component';

describe('ListarSolicitudesPersonalizadasComponent', () => {
  let component: ListarSolicitudesPersonalizadasComponent;
  let fixture: ComponentFixture<ListarSolicitudesPersonalizadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSolicitudesPersonalizadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSolicitudesPersonalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
