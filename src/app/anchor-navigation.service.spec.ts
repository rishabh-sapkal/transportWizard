import { TestBed } from '@angular/core/testing';

import { AnchorNavigationService } from './anchor-navigation.service';

describe('AnchorNavigationService', () => {
  let service: AnchorNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnchorNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
