import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoformularioComponent } from './productoformulario.component';

describe('ProductoformularioComponent', () => {
  let component: ProductoformularioComponent;
  let fixture: ComponentFixture<ProductoformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoformularioComponent]
    });
    fixture = TestBed.createComponent(ProductoformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
