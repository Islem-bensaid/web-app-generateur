import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreFicheUtilisateurComponent } from './filtre-fiche-utilisateur.component';

describe('FiltreFicheUtilisateurComponent', () => {
  let component: FiltreFicheUtilisateurComponent;
  let fixture: ComponentFixture<FiltreFicheUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreFicheUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreFicheUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
