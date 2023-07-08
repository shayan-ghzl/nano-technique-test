import { TestBed } from '@angular/core/testing';

import { JwtInterceptor } from './jwt.interceptor';
import { AuthenticationService } from '../services/authentication.service';

describe('JwtInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      JwtInterceptor,
      { provide: AuthenticationService, useValue: {} },
    ]
  }));

  it('should be created', () => {
    const interceptor: JwtInterceptor = TestBed.inject(JwtInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
