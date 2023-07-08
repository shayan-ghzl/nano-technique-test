import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: {} },
        { provide: NavController, useValue: {} },
      ]
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
