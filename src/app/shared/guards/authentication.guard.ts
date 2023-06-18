import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const AuthenticationGuard: CanMatchFn = (route, segments) => {
  const authenticationService = inject(AuthenticationService);
  return authenticationService.getAuthState$.pipe(
    map((value) => {
      if (value) {
        return true;
      }
      authenticationService.logoutDone(true);
      return false;
    })
  );
};