import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { map } from 'rxjs';

export const LoggedinGuard: CanMatchFn = (route, segments) => {
  const authenticationService = inject(AuthenticationService);
  return authenticationService.getAuthState$.pipe(
    map((value) => {
      if (value === null) {
        return true;
      }
      return false;
    })
  );
};