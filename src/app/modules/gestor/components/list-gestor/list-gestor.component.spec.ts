import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGestorComponent } from './list-gestor.component';

describe('ListGestorComponent', () => {
  let component: ListGestorComponent;
  let fixture: ComponentFixture<ListGestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListGestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
