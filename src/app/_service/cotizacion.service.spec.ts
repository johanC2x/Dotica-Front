import { TestBed } from '@angular/core/testing';

import { CotizacionService } from './cotizacion.service';

describe('CotizacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CotizacionService = TestBed.get(CotizacionService);
    expect(service).toBeTruthy();
  });
});
