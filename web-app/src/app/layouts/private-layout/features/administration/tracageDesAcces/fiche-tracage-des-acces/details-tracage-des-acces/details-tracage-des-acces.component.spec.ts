import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTracageDesAccesComponent } from './details-tracage-des-acces.component';

describe('DetailsTracageDesAccesComponent', () => {
  let component: DetailsTracageDesAccesComponent;
  let fixture: ComponentFixture<DetailsTracageDesAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTracageDesAccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTracageDesAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
