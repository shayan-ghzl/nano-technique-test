import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
  ) { 
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authenticationService.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authenticationService.token}`
        }
      });
    } else {
      this.authenticationService.logoutDone();
    }

    return next.handle(request);
  }
}
