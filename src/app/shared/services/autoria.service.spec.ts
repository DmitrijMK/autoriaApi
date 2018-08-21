import { TestBed, inject } from '@angular/core/testing';

import { AutoriaService } from './autoria.service';

describe('AutoriaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoriaService]
    });
  });

  it('should be created', inject([AutoriaService], (service: AutoriaService) => {
    expect(service).toBeTruthy();
  }));
});
