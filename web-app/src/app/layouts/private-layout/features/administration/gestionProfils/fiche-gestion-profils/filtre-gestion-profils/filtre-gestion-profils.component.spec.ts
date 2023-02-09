import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreGestionProfilsComponent } from './filtre-gestion-profils.component';

describe('FiltreGestionProfilsComponent', () => {
  let component: FiltreGestionProfilsComponent;
  let fixture: ComponentFixture<FiltreGestionProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreGestionProfilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreGestionProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
