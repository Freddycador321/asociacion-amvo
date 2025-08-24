import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaformularioComponent } from './categoriaformulario.component';

describe('CategoriaformularioComponent', () => {
  let component: CategoriaformularioComponent;
  let fixture: ComponentFixture<CategoriaformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaformularioComponent]
    });
    fixture = TestBed.createComponent(CategoriaformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
