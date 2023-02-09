import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreTracageDesDonnesComponent } from './filtre-tracage-des-donnes.component';

describe('FiltreTracageDesDonnesComponent', () => {
  let component: FiltreTracageDesDonnesComponent;
  let fixture: ComponentFixture<FiltreTracageDesDonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreTracageDesDonnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreTracageDesDonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
