import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsGestionProfilsComponent } from './details-gestion-profils.component';

describe('DetailsGestionProfilsComponent', () => {
  let component: DetailsGestionProfilsComponent;
  let fixture: ComponentFixture<DetailsGestionProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsGestionProfilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsGestionProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
