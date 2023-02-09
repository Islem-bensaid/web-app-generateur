import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTracageDesDonnesComponent } from './detail-tracage-des-donnes.component';

describe('DetailTracageDesDonnesComponent', () => {
  let component: DetailTracageDesDonnesComponent;
  let fixture: ComponentFixture<DetailTracageDesDonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailTracageDesDonnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTracageDesDonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
