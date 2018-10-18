import { catchError, map } from 'rxjs/operators';
import { IPalet } from './palet';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AlertsService } from 'angular-alert-module';

@Injectable()
export class AuthService {

  private _loginUrl = 'https://localhost:8443/delivery/all';
  constructor(private http: HttpClient, private alerts: AlertsService) { }
  getAllPallets(token) {

    let headers: HttpHeaders = new HttpHeaders;

    headers = headers.append('Accept', 'application/json, text/plain, */*');
    headers = headers.append('Authorization', 'Basic ' + token);
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');

      console.log(headers);
      return this.http.get<IPalet[]>(this._loginUrl, {
        headers: headers})
        .pipe(
          catchError(this.catchAuthError)
        );
  }

  catchAuthError (error: HttpErrorResponse) {
      if (error.status === 401 || error.status === 403) {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('pass');
        return throwError(
         console.log('Not Good'),
        );
      }
    }
    successMess() {
      this.alerts.setMessage('Палетата са заредени успешно!', 'success');
      this.alerts.setDefaults('timeout', 3);
      this.alerts.setConfig('success', 'icon', 'warning');
     }
     errorMess() {
      this.alerts.setMessage('Моля опитайте отново...', 'error');
    }

    logout(): void {
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('pass');
    }
}
