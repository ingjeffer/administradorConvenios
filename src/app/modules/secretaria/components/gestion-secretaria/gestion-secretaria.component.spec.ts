import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSecretariaComponent } from './gestion-secretaria.component';

describe('GestionSecretariaComponent', () => {
  let component: GestionSecretariaComponent;
  let fixture: ComponentFixture<GestionSecretariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionSecretariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSecretariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
