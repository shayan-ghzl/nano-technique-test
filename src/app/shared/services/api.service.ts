import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getReadyDevices(parameters: { [key: string]: string | number | boolean }) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.get<any>(environment.apiUrl + '/api/Servicer/get-all-ready-to-install-device-list', { params: params }).pipe(
      tap(console.log)
    );
  }
  
  getinstalledDevices(parameters: { [key: string]: string | number | boolean }) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.get<any>(environment.apiUrl + '/api/Servicer/get-all-installed-device-list-by-servicer', { params: params }).pipe(
      tap(console.log)
    );
  }

}
