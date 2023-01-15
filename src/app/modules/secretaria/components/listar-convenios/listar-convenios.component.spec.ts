import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConveniosComponent } from './listar-convenios.component';

describe('ListarConveniosComponent', () => {
  let component: ListarConveniosComponent;
  let fixture: ComponentFixture<ListarConveniosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarConveniosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarConveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
