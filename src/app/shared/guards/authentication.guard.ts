import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const AuthenticationGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  return authenticationService.getCurrentUser().pipe(
    map((value) => {
      if (!value) {
        router.navigateByUrl('/login');
        return false;
      }
      return true;
    })
  );
};

// return this.authenticationService.getCurrentUser().pipe(
//   map((value) => {
//     if (value) {
//       this.router.navigateByUrl('/home');
//       return false;
//     }
//     return true;
//   })
// );
