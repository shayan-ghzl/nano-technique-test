import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as pako from 'pako';
import { BehaviorSubject, Observable, catchError, map, of, take, tap, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthState, CurrentUser } from '../models/models';
import jwt_decode from "jwt-decode";


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
    // private router: Router,
    private navController: NavController,
  ) {

  }

  login(authInput: { srName: string; srPass: string }) {
    return this.http.post<any>(environment.apiUrl + '/api/Servicer/servicer-login', authInput).pipe(
      timeout(20000),
      map(response => ({...response, customStatus: true})),
      catchError((error) => of({...error, customStatus: false})),
      tap(response => {
        if (response.customStatus) {
          const compressed = pako.deflate(response.Value);
          const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
          this.loginDone({...response, Value: restored});
        }
      }),
    );
  }

  refreshToken(refreshToken: string){
    console.log(refreshToken);
    return this.http.post<any>(environment.apiUrl + '/api/Servicer/servicer-refresh-token', null, { params: { 'RToken': refreshToken } }).pipe(
      take(1),
      timeout(20000),
      catchError(() => of(false)),
      tap(response => {
        if (response) {
          const compressed = pako.deflate(response.Value);
          const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }));
          this.token = restored.Token;
        }else{
          this.logoutDone();
        }
      }),
    );  
  }

  logout() {
    return this.http.post<any>(environment.apiUrl + '/api/Servicer/servicer-logout', null).pipe(
      timeout(20000),
      catchError(() => of(false)),
      tap(response => {
        if (response) {
          this.logoutDone();
        }
      }),
    );
  }

  logoutDone(fromGuard = false) {
    this.token = '';
    if (!fromGuard) {
      this.setAuthState(null);
    }
    clearInterval(this.intervalId);
    // this.router.navigateByUrl('/login');
    // this.navController.pop().then(() => {
    //   this.navController.navigateRoot("/login");
    // });
    //   this.navController.navigateRoot("/login");
    this.navController.navigateRoot("/login");
  }

  intervalId: any;
  loginDone(response: CurrentUser) {
    const decoded: any = jwt_decode(response.Value.Token);
    if (decoded.iss === 'NanoTechnic.ir') {
      this.token = response.Value.Token;
      this.setAuthState({...response, Key: decoded.srCode});
      this.intervalId = setInterval(() => { 
        this.refreshToken(response.Value.RefreshToken).subscribe();
      }, 900000);
      // this.router.navigateByUrl('/tabs/home');
      // this.navController.pop().then(() => {
      //   this.navController.navigateForward("/tabs/home");
      // });
      //   this.navController.navigateForward("/tabs/home");
      this.navController.navigateRoot("/tabs/home");
    }
  }

}
