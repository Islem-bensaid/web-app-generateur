import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreTracageDesAccesComponent } from './filtre-tracage-des-acces.component';

describe('FiltreTracageDesAccesComponent', () => {
  let component: FiltreTracageDesAccesComponent;
  let fixture: ComponentFixture<FiltreTracageDesAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreTracageDesAccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreTracageDesAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
