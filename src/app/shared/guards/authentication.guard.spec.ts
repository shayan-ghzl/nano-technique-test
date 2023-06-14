import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';


describe('authenticationGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthenticationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});