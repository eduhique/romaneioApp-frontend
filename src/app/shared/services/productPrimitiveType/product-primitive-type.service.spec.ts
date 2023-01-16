import { TestBed } from '@angular/core/testing';

import { ProductPrimitiveTypeService } from './product-primitive-type.service';

describe('ProductPrimitiveTypeService', () => {
  let service: ProductPrimitiveTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductPrimitiveTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
