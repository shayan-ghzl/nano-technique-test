import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { CurrentUser } from '../models/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // CurrentUser Store
  token = '';
  private currentUserSource = new BehaviorSubject<CurrentUser>('pending');
  getCurrentUser$: Observable<CurrentUser> = this.currentUserSource.asObservable().pipe(
    tap((value) => {
      // @ts-ignore
      if (value.token) { this.token = value.token; }
      else { this.token = ''; }
    }),
  );
  
  private setCurrentUser(currentUser: CurrentUser) {
    this.currentUserSource.next(currentUser);
  }

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /*
   - If it return Observable<false> means the user is not authenticated
     and if it return Observable<true> means the user is authenticated.
   - It also handles localStorage and also currentUser in the store.
  */
  getCurrentUser() {
    let temp = localStorage.getItem('ut');
    if (temp || this.token) {
      return this.http.get<any>(environment.apiUrl + 'Users/GetCurrentUser').pipe(
        tap((value) => {
          console.log(value, 'getCurrentUser');
        }),
        map((response) => {
          if (response.issuccess) {
            this.login(response);
            return true;
          }
          localStorage.removeItem('ut');
          this.setCurrentUser('rejected');
          return false;
        }),
        catchError(() => {
          this.setCurrentUser('rejected');
          return of(false);
        })
      );
    }
    return of(false);
  }


  logout() {
    localStorage.removeItem('ut');
    this.setCurrentUser('pending');
    this.router.navigateByUrl('/login');
  }

  login(response: any) {
    localStorage.setItem('ut', response.data.token);
    this.setCurrentUser(response.data);
  }
}
