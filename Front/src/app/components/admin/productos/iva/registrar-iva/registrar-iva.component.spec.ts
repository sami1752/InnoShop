import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarIvaComponent } from './registrar-iva.component';

describe('RegistrarIvaComponent', () => {
  let component: RegistrarIvaComponent;
  let fixture: ComponentFixture<RegistrarIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
