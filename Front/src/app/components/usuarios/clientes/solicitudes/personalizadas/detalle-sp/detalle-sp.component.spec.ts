import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSPComponent } from './detalle-sp.component';

describe('DetalleSPComponent', () => {
  let component: DetalleSPComponent;
  let fixture: ComponentFixture<DetalleSPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSPComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
