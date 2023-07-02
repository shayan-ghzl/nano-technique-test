import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionDto, IDeviceDto } from '../models/models';

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
    return this.http.get<IDeviceDto>(environment.apiUrl + '/api/Servicer/get-all-ready-to-install-device-list', { params: params }).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }
  
  getinstalledDevices(parameters: { [key: string]: string | number | boolean }) {
    let params = new HttpParams();
    for (const [key, value] of Object.entries(parameters)) {
      params = params.append(key, value);
    }
    return this.http.get<IDeviceDto>(environment.apiUrl + '/api/Servicer/get-all-installed-device-list-by-servicer', { params: params }).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }

  getDeviceById(id: number) {
    return this.http.get<IActionDto>(environment.apiUrl + '/api/Servicer/get-ready-to-install-device-detail-by-idrID', { params: new HttpParams().append('idrRID', id) }).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }

  postViewdPlans(parameters: any) {
    return this.http.post<any>(environment.apiUrl + '/api/InstallationResult/view-new-plan-to-install-by-servicer', parameters).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }

  postInstallationResult(parameters: any) {
    return this.http.post<any>(environment.apiUrl + '/api/InstallationResult/finish-new-installation-by-servicer', parameters).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }
  
  postStartInstallation(parameters: any) {
    return this.http.post<any>(environment.apiUrl + '/api/InstallationResult/start-new-installation-by-servicer', parameters).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }

  postAcceptPlanToInstall(parameters: any) {
    return this.http.post<any>(environment.apiUrl + '/api/InstallationResult/accept-new-plan-to-install-by-servicer', parameters).pipe(
      timeout(20000),
      catchError(() => of<false>(false)),
    );
  }

}
