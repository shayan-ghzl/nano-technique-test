import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { map, of } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

// this is authentication guard
export const authenticationGuard: CanMatchFn = (route, segments) => {
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

// this is loggedin guard
export const loggedinGuard: CanMatchFn = (route, segments) => {
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

// this is splash screen guard
export const splashScreenGuard: CanMatchFn = (route, segments) => {
  const authenticationService = inject(AuthenticationService);
  return authenticationService.getAuthState$.pipe(
    map((value) => {
      if (value === null && authenticationService.isFirstTime) {
        authenticationService.isFirstTime = false;
        return true;
      }
      return false;
    })
  );
};

