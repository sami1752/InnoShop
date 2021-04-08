import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPrecioComponent } from './listar-precio.component';

describe('ListarPrecioComponent', () => {
  let component: ListarPrecioComponent;
  let fixture: ComponentFixture<ListarPrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
