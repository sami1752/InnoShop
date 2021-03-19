import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistasAdminComponent } from './vistas-admin.component';

describe('VistasAdminComponent', () => {
  let component: VistasAdminComponent;
  let fixture: ComponentFixture<VistasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistasAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VistasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
