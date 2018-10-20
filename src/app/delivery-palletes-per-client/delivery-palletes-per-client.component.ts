import { FormControl, Validators } from '@angular/forms';
import { ICustomer } from './../customer';
import { DisplayClient } from './../display-client';
import { PaletService } from './../palet.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IPalet } from '../palet';
import { DropDownMenu } from '../drop-down-menu';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-delivery-palletes-per-client',
  templateUrl: './delivery-palletes-per-client.component.html',
  styleUrls: ['./delivery-palletes-per-client.component.css']
})
export class DeliveryPalletesPerClientComponent implements OnInit {

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  constructor(private paleteService: PaletService) { }
  clientId = this.paleteService.getClientId();
  clienDetailList: DisplayClient[] = this.paleteService.getClientDetails();
  customerInfo: ICustomer[] = this.paleteService.getCustomerInfo();
  displayCustomer: DisplayClient;
  countPalletes;
  displayPalletes: IPalet[];
  customer;
  cols = this.paleteService.getClientCompColumns();
  value;
  statement;
  selected;
  show = true;
  selectedValue: string;
  selecting: DropDownMenu[] = [
    {value: '0', viewValue: 'Приемане без забележки'},
    {value: '1', viewValue: 'Приемане и връщане'},
    {value: '2', viewValue: 'Частично приемане'},
    {value: '3', viewValue: 'Частично приемане и връщане'},
    {value: '4', viewValue: 'Доставено в склад'},
    {value: '5', viewValue: 'Друго'},
  ];
  selectingControl = new FormControl('', [Validators.required]);
  signaturePadOptions: Object = {
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'style': 'border: solid black'
  };
  sign;
  ngOnInit() {
    this.getClient();
    this.getClientInfo();
  }
  getClient() {
    for (const client of this.clienDetailList) {
      if (client.customerId === this.clientId) {
        return this.displayCustomer = client,
        this.displayPalletes = client.palletes,
        this.countPalletes = client.palletes.length;
      }
    }
  }
  getClientInfo() {
    for (const cust in this.customerInfo) {
      if (cust === this.clientId) {
        return this.customer = this.customerInfo[cust];
      }
    }
  }
  onEnter(value: string) {
   return this.value = value;
  }
  onStatement(value: string) {
    return this.statement = value;
  }
  makeSignature() {
    this.show = false;
    return this.signaturePadOptions;
  }
  AfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
  drawComplete() {
    this.sign = this.signaturePad.toDataURL();
    console.log(this.sign);
    this.show = true;
  }
  showSignature() {
    this.signaturePad.fromDataURL(this.sign);
    this.show = false;
  }
}