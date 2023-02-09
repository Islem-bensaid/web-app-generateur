import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheTracageDesDonnesComponent } from './fiche-tracage-des-donnes.component';

describe('FicheTracageDesDonnesComponent', () => {
  let component: FicheTracageDesDonnesComponent;
  let fixture: ComponentFixture<FicheTracageDesDonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FicheTracageDesDonnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheTracageDesDonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
