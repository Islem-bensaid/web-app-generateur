import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTracageDesAccesComponent } from './fiche-tracage-des-acces.component';

describe('FicheTracageDesAccesComponent', () => {
  let component: FicheTracageDesAccesComponent;
  let fixture: ComponentFixture<FicheTracageDesAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheTracageDesAccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheTracageDesAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
