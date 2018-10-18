import { ModalComponentComponent } from './../modal-component/modal-component.component';
import { AlertsService } from 'angular-alert-module';
import { Router } from '@angular/router';
import { DisplayClient } from './../display-client';
import { PaletService } from './../palet.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { IPalet } from '../palet';
import { ModalDialogService } from 'ngx-modal-dialog';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {
  constructor(private paletService: PaletService, private route: Router,
    private alerts: AlertsService, private modalService: ModalDialogService,
    private viewRef: ViewContainerRef) { }

  allPallets: IPalet[] = this.paletService.getAllPallets();
  columns = this.paletService.getColumns();
  map = new Map();
  clientList;
  displayList: DisplayClient[] = [];
  lat: number;
  lng: number;
  cusId;
  IsmodelShow = true;
  clickTopermission = false;
  disabler = 0;
  clientDetailId;
  ngOnInit() {
    this.getClients();
  }
  getClients() {
    for (const pal of this.allPallets) {
      const clientList: DisplayClient = {
          customerName: pal.customerName,
          streetName: pal.streetName,
          coordinate: pal.coordinates,
          distance: this.getDistance(pal),
          customerId: pal.customerId,
          palletes: [pal]
        };
      if (this.cusId !== pal.customerId) {
        this.displayList.push(clientList);
        this.cusId = pal.customerId;
      } else {
        for (const clien of this.displayList) {
          if (clien.customerId === pal.customerId) {
            clien.palletes.push(pal);
          }
        }
      }
    }
    console.log(this.displayList);
    this.paletService.setClientDetails(this.displayList);
    this.paletService.setRouteId(this.clientDetailId);
    return this.displayList;
  }

  rad = function(x) {
    return x * Math.PI / 180;
  };
  getDistance (pale: IPalet) {
    this.parseCoordinates(pale.coordinates);
    const latyHalle = 42.6977082;
    const lngyHalle = 23.321867;
    const R = 6371; // Radius of the earth in km
    const dLat = this.rad(this.lat - latyHalle);
    const dLong = this.rad(this.lng - lngyHalle);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(latyHalle)) * Math.cos(this.rad(this.lat)) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dist = R * c;
    return dist.toFixed(2); // returns the distance in km
  }
  showMap () {

  }
  parseCoordinates (coors: string) {
    const searchString = coors;
    const commaPos = searchString.indexOf(',');
    return this.lat = parseFloat(searchString.substring(0, commaPos)),
    this.lng = parseFloat(searchString.substring(commaPos + 1, searchString.length));
  }
  gpBackIfYouWant() {
  }
  postDeliveryPalletes () {
    // this.paletService.makePost();
    this.openNewDialog();
  }
  goToClientDetails (routeValue) {
    if (this.disabler === 1) {
      this.route.navigate(['/deliveryPalletesPerClient/' + routeValue]);
    } else {
      this.alerts.setMessage('Маршрутът не е приет...', 'error');
    }
      this.clientDetailId = routeValue;
      this.paletService.setClientId(this.clientDetailId);
      return this.clientDetailId;
  }
  openNewDialog() {
    this.modalService.openDialog(this.viewRef, {
      title: 'Some modal title',
      childComponent: ModalComponentComponent,
    });
    this.clickTopermission = true;
    return this.disabler = 1;
  }
}
