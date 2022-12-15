import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestorComponent } from './form-gestor.component';

describe('FormGestorComponent', () => {
  let component: FormGestorComponent;
  let fixture: ComponentFixture<FormGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
