import { DisplayClient } from './display-client';
import { IpostPalletStatus } from './ipost-pallet-status';
import { IPalet } from './palet';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ICustomer } from './customer';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable()
export class PaletService {

  private _url = 'https://localhost:8443/delivery/update-pallet-status';
  private secUrl = 'https://localhost:8443/delivery/route-status/';
  constructor(private http: HttpClient, private _authService: AuthService) { }
  headers = new HttpHeaders;
  public errorMsg;

  allPallets;
  statusPallets;
  clientDetList;
  clientIdRoute;
  clientId;
  customerInfo;
  id = localStorage.getItem('pass');
  routId;

  makeHeaders() {
    return this.headers = this.headers.append('Accept', 'application/json, text/plain, */*'),
    this.headers = this.headers.append('Authorization', 'Basic ' + this.id),
    this.headers = this.headers.append('Content-Type', 'application/json; charset=utf-8');
  }

  setPalletStatuses(statusPaletes) {
  const header = this.headers;
  return this.http.post<IpostPalletStatus[]>(this._url, statusPaletes, {
    headers: header})
    .pipe(
      catchError(this._authService.catchAuthError)
    )
    .subscribe(data => {
      this._authService.successMess();
    },
      error => {
        this.errorMsg = error;
        this._authService.errorMess();
      });
  }
  getId() {
    const palls = this.getAllPallets();
    let id = this.routId;
    palls.forEach(function(pallete: IPalet) {
      id = pallete.routeId;
      return;
    });
    return id.toString();
  }

  getRouteInfo() {
    const strId = this.getId();
    const newUrl = this.secUrl + strId;
    const header = this.makeHeaders();
    return this.http.get<ICustomer>(newUrl, {
      headers: header})
      .pipe(
        catchError(this._authService.catchAuthError)
      )
      .subscribe(data => {
        this.customerInfo = data;
        this.setCustomerInfo(this.customerInfo);
        console.log(this.customerInfo);
      },
        error => {
          this.errorMsg = error;
          this._authService.errorMess();
        });
  }


  setAllPallets(pallets: IPalet[]) {
     this.allPallets = pallets;
    localStorage.setItem('allPallets', JSON.stringify(this.allPallets));
  }

  getAllPallets() {
    this.allPallets = localStorage.getItem('allPallets');
    return JSON.parse(this.allPallets);
  }
  setStatuses(statusPal: IpostPalletStatus[]) {
    this.statusPallets = statusPal;
    localStorage.setItem('statusPallets', JSON.stringify(this.statusPallets));
  }
  getStatuses() {
    this.statusPallets = localStorage.getItem('statusPallets');
    return JSON.parse(this.statusPallets);
  }

  setClientDetails(list: DisplayClient[]) {
    this.clientDetList = list;
    localStorage.setItem('clientDetList', JSON.stringify(this.clientDetList));
  }
  getClientDetails() {
    this.clientDetList = localStorage.getItem('clientDetList');
    return JSON.parse(this.clientDetList);
  }
  setRouteId (id) {
    this.clientIdRoute = id;
    localStorage.setItem('clientIdRoute', JSON.stringify(this.clientIdRoute));
  }
  getRouteId () {
    this.clientIdRoute = localStorage.getItem('clientIdRoute');
    return JSON.parse(this.clientIdRoute);
  }
  setClientId (clientId) {
    this.clientId = clientId;
    localStorage.setItem('clientId', JSON.stringify(this.clientId));
  }
  getClientId () {
    this.clientId = localStorage.getItem('clientId');
    return JSON.parse(this.clientId);
  }
  setCustomerInfo(cusInfo: ICustomer[]) {
    this.customerInfo = cusInfo;
    localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo));
  }
  getCustomerInfo() {
    this.customerInfo = localStorage.getItem('customerInfo');
    return JSON.parse(this.customerInfo);
  }
  makePost () {
    this.setPalletStatuses(this.statusPallets);
  }
  getColumns(): string[] {
    return ['Клиент', 'Адрес', 'Разстояние'];
  }
  getClientCompColumns() {
    return ['Пале No.', 'Прието', 'Отказано'];
  }
}

