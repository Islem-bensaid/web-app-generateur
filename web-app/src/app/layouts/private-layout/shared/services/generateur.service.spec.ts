import { TestBed } from '@angular/core/testing';

import { GenerateurService } from './generateur.service';

describe('GenerateurService', () => {
  let service: GenerateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
