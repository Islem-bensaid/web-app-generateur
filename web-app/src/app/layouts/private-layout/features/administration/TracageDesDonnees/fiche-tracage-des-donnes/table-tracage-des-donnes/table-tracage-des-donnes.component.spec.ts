import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTracageDesDonnesComponent } from './table-tracage-des-donnes.component';

describe('TableTracageDesDonnesComponent', () => {
  let component: TableTracageDesDonnesComponent;
  let fixture: ComponentFixture<TableTracageDesDonnesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTracageDesDonnesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTracageDesDonnesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
