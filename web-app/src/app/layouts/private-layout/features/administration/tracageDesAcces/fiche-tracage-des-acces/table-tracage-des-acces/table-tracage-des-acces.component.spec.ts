import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTracageDesAccesComponent } from './table-tracage-des-acces.component';

describe('TableTracageDesAccesComponent', () => {
  let component: TableTracageDesAccesComponent;
  let fixture: ComponentFixture<TableTracageDesAccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableTracageDesAccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTracageDesAccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
