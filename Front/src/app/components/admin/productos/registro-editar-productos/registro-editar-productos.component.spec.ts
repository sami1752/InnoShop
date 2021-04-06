import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEditarProductosComponent } from './registro-editar-productos.component';

describe('RegistroEditarProductosComponent', () => {
  let component: RegistroEditarProductosComponent;
  let fixture: ComponentFixture<RegistroEditarProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEditarProductosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEditarProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
