import { CanActivateFn } from '@angular/router';

export const invoiceGuard: CanActivateFn = (route, state) => {
  return true;
};
