import { TestBed } from '@angular/core/testing';

import { RomaneiosService } from './romaneios.service';

describe('RomaneiosService', () => {
  let service: RomaneiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RomaneiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
