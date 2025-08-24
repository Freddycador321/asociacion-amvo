import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerProductoLogComponent } from './ver-producto-log.component';

describe('VerProductoLogComponent', () => {
  let component: VerProductoLogComponent;
  let fixture: ComponentFixture<VerProductoLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerProductoLogComponent]
    });
    fixture = TestBed.createComponent(VerProductoLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
