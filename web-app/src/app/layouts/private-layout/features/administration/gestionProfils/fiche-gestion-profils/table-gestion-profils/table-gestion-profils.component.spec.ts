import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGestionProfilsComponent } from './table-gestion-profils.component';

describe('TableGestionProfilsComponent', () => {
  let component: TableGestionProfilsComponent;
  let fixture: ComponentFixture<TableGestionProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGestionProfilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGestionProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
