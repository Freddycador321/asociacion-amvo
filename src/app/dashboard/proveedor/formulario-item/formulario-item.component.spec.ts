import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioItemComponent } from './formulario-item.component';

describe('FormularioItemComponent', () => {
  let component: FormularioItemComponent;
  let fixture: ComponentFixture<FormularioItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioItemComponent]
    });
    fixture = TestBed.createComponent(FormularioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
