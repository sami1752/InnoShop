import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSalidasProductoMComponent } from './listar-salidas-producto-m.component';

describe('ListarSalidasProductoMComponent', () => {
  let component: ListarSalidasProductoMComponent;
  let fixture: ComponentFixture<ListarSalidasProductoMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSalidasProductoMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSalidasProductoMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
