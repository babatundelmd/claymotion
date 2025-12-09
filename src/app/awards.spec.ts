import { TestBed } from '@angular/core/testing';

import { Awards } from './awards';

describe('Awards', () => {
  let service: Awards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Awards);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
