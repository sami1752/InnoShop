import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarImagenComponent } from './registrar-imagen.component';

describe('RegistrarImagenComponent', () => {
  let component: RegistrarImagenComponent;
  let fixture: ComponentFixture<RegistrarImagenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarImagenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
