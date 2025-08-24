import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticosComponent } from './estadisticos.component';

describe('EstadisticosComponent', () => {
  let component: EstadisticosComponent;
  let fixture: ComponentFixture<EstadisticosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstadisticosComponent]
    });
    fixture = TestBed.createComponent(EstadisticosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
