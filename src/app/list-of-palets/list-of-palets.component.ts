import { AlertsService } from 'angular-alert-module';
import { of } from 'rxjs';
import { PaletService } from './../palet.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';
import { IPalet } from './../palet';
import { IpostPalletStatus } from './../ipost-pallet-status';
import { Statuses } from '../statuses';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-of-palets',
  templateUrl: './list-of-palets.component.html',
  styleUrls: ['./list-of-palets.component.css']
})
export class ListOfPaletsComponent implements OnInit {

  constructor(private _authService: AuthService, private _paletService: PaletService,
    location: PlatformLocation, private router: Router,
    private alerts: AlertsService) {
    location.onPopState(() => {
      const confirmation = window.confirm('Желаете ли да смените доставчика?');
      const isUpdating = true;
      if (confirmation === true) {
        this._authService.logout();
      } else {
        return history.go(1);
      }
  });
  }
  public errorMsg;
  paletes = [];
  deliveryPaletes = 0;
  deliveryKg = 0;
  deliveryVol = 0;
  client = 0;
  bodyStatusPalletes = [];
  clients = new Set();
  status = new Statuses();
  statusPallet = new IpostPalletStatus;

  ngOnInit() {
    this.getListOfPalet();
  }

  getListOfPalet() {
    const id = localStorage.getItem('pass');
    this._authService.getAllPallets(id)
    .subscribe(data => {
      this.paletes = data;
      this._authService.successMess();
    },
      error => {
        this.errorMsg = error;
        this._authService.errorMess();
      });
    return this.paletes;
 }

  addToDeliveryList(palet: IPalet) {
    if (!this.clients.has(palet.customerName)) {
      this.client += 1;
      this.clients.add(palet.customerName);
    } else {
      this.clients.add(palet.palletId);
    }
    console.log(this.paletes);
    palet.status = 'NEW';
    this.setPallets();
    console.log(palet.status);
    this.makePlusView(palet);
  }
  removeFromDeliveryList(palet: IPalet) {
    if (this.clients.has(palet.palletId)) {
      this.clients.delete(palet.palletId);
      this.makeMinusView(palet);
      return this.client;
    } else {
      if (this.client !== 0 && (this.clients.has(palet.customerName))) {
        this.client -= 1;
      } else {
        this.clients.delete(palet.customerName);
        palet.status = 'CANCELED';
        this.setPallets();
        console.log(palet.status);
        console.log(this.paletes);
        return this.client;
      }
    }
    palet.status = 'CANCELED';
    this.setPallets();
    console.log(palet.status);
    console.log(this.paletes);
    this.clients.delete(palet.customerName);
    this.makeMinusView(palet);
  }

  makeMinusView(palet: IPalet) {
    return this.deliveryKg = this.deliveryKg - palet.palletKG,
    this.deliveryVol = this.deliveryVol - palet.palletVol,
    this.deliveryPaletes = this.deliveryPaletes - 1;
  }

  makePlusView(palet: IPalet) {
    return this.deliveryKg += palet.palletKG,
    this.deliveryVol += palet.palletVol,
    this.deliveryPaletes += 1;
  }

  updatePallets() {
    this.getListOfPalet();
    this.deliveryPaletes = 0;
    this.deliveryKg = 0;
    this.deliveryVol = 0;
    this.client = 0;
  }

  goToDelivery() {
    let permition = true;
    for ( const pallete of this.paletes) {
      if (pallete.status !== 'NEW' && pallete.status !== 'CANCELED') {
        return permition = false,
        this.alerts.setMessage('Има палета без статус...', 'error');
      }
    }
    if (permition === true) {
      this.postPallets();
      this._paletService.getRouteInfo();
      this.router.navigate(['deliveryRoute']);
    }
  }

  setPallets() {
    this._paletService.setAllPallets(this.paletes);
  }

  postPallets() {
    const statusPalle = this.statusPallet;
    const statusLoaded = this.status.statusLoaded;
    const statusCanceled = this.status.statusCanceled;
    const bodyStatusPalletes = this.bodyStatusPalletes;

    this.paletes.forEach(function(pallete: IPalet) {
        if (pallete.status === 'NEW') {
          statusPalle.palletId = pallete.palletId;
          statusPalle.palletStatus = statusLoaded;
          statusPalle.routeId = pallete.routeId;
          statusPalle.coordinates = pallete.coordinates;
          bodyStatusPalletes.push(statusPalle);
      } else {
        statusPalle.palletId = pallete.palletId;
        statusPalle.palletStatus = statusCanceled;
        statusPalle.routeId = pallete.routeId;
        statusPalle.coordinates = pallete.coordinates;
        bodyStatusPalletes.push(statusPalle);
      }
    });
    this.bodyStatusPalletes =  bodyStatusPalletes;
    console.log(this.bodyStatusPalletes);
    this._paletService.setStatuses(this.bodyStatusPalletes);
    // this._paletService.setPalletStatuses(bodyStatusPalletes);
    return this.bodyStatusPalletes;
  }
}
