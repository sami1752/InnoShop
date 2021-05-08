import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEntradaPSComponent } from './agregar-entrada-ps.component';

describe('AgregarEntradaPSComponent', () => {
  let component: AgregarEntradaPSComponent;
  let fixture: ComponentFixture<AgregarEntradaPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEntradaPSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEntradaPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
