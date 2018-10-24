import { Statuses } from './../statuses';
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
  valueSum;
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
  status = new Statuses();
  comment;
  fileToUpload;
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

  onComment(value: string) {
    return this.comment = value,
    console.log(this.comment);
   }
  onEnter(value: string) {
   return this.valueSum = value,
   console.log(this.valueSum);
  }
  onStatement(value: string) {
    return this.statement = value;
  }
  makeSignature() {
    this.show = false;
    return this.signaturePadOptions;
  }
  AfterViewInit() {
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();
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

  setDeliveterStatus(pall: IPalet) {
    const stat = this.status.statusReceived;
    return pall.status = stat,
    console.log(pall),
    console.log(this.displayPalletes);
  }
  setReturnedStatus(pall: IPalet) {
    const stat = this.status.statusReturned;
    return pall.status = stat,
    console.log(pall),
    console.log(this.displayPalletes);
  }
  onFileChanged(event) {
    this.fileToUpload = event.target.files[0];
    console.log(this.fileToUpload);
  }
  showPic (event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (eve) => { // called once readAsDataURL is completed
        this.fileToUpload = event.target.result;
      };
    }
  }
}
