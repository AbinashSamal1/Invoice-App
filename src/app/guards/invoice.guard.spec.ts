import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { invoiceGuard } from './invoice.guard';

describe('invoiceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => invoiceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
}
);
