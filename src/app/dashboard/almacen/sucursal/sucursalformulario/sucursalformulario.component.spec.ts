import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalformularioComponent } from './sucursalformulario.component';

describe('SucursalformularioComponent', () => {
  let component: SucursalformularioComponent;
  let fixture: ComponentFixture<SucursalformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucursalformularioComponent]
    });
    fixture = TestBed.createComponent(SucursalformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
