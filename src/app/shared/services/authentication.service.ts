import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState, CurrentUser } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authStateSource = new BehaviorSubject<AuthState | null>(null);

  getAuthState$: Observable<AuthState | null> = this.authStateSource.asObservable();
  
  private setAuthState(authState: AuthState) {
    this.authStateSource.next(authState);
  }

  token = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  intervalId: any;
  login(authInput: { srName: string; srPass: string }) {
    return this.http.post<any>(environment.apiUrl + '/api/Servicer/servicer-login', authInput).pipe(
      catchError(() => of(false)),
      tap(response => {
        if (response) {
          this.token = (response as CurrentUser).Value.Token;
          this.setAuthState(response as CurrentUser);
          console.log(JSON.parse(response), 'response');
          
          this.intervalId = setInterval(() => { 
            this.refreshToken((response as CurrentUser).Value.RefreshToken).subscribe();
          }, 20000);
          this.router.navigateByUrl('/tabs/home');
        }
      }),
    );
  }

  refreshToken(refreshToken: string){
    console.log(refreshToken);
    return this.http.post<any>(environment.apiUrl + '/api/Servicer/servicer-refresh-token', null, { params: { 'RToken': refreshToken } }).pipe(
      take(1),
      // this.token = (response as CurrentUser).Value.Token;
      tap(console.log)
    );  
  }

  logout() {
    return this.http.post<any>(environment.apiUrl + '/api/Servicer/servicer-logout', null).pipe(
      tap(console.log)
    );
  }

  logoutDone() {
    this.token = '';
    this.setAuthState(null);
    clearInterval(this.intervalId);
    this.router.navigateByUrl('/login');
  }

}
