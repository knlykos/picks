import { TestBed } from '@angular/core/testing';

import { AppAlertService } from './app-alert.service';

describe('AppAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppAlertService = TestBed.get(AppAlertService);
    expect(service).toBeTruthy();
  });
});
