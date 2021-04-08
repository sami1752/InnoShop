import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarPrecioComponent } from './registrar-precio.component';

describe('RegistrarPrecioComponent', () => {
  let component: RegistrarPrecioComponent;
  let fixture: ComponentFixture<RegistrarPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
