import { TestBed } from '@angular/core/testing';

import { ThJsService } from './th.js.service';

describe('ThJsService', () => {
  let service: ThJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
