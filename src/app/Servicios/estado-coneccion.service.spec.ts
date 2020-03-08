import { TestBed } from '@angular/core/testing';

import { EstadoConeccionService } from './estado-coneccion.service';

describe('EstadoConeccionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoConeccionService = TestBed.get(EstadoConeccionService);
    expect(service).toBeTruthy();
  });
});
