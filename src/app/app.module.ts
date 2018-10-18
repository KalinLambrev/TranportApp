import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { PaletService } from './palet.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { ListOfPaletsComponent } from './list-of-palets/list-of-palets.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { AlertsModule } from 'angular-alert-module';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { DeliveryPalletesPerClientComponent } from './delivery-palletes-per-client/delivery-palletes-per-client.component';
import { ModalDialogModule, ModalDialogService } from 'ngx-modal-dialog';
import { ModalComponentComponent } from './modal-component/modal-component.component';
import { DialogService } from './dialog.service';
import { OnlyNumberDirective } from './only-number.directive';
import {MatSelectModule} from '@angular/material/select';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AngularFileUploaderModule } from 'angular-file-uploader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListOfPaletsComponent,
    PageNotFoundComponent,
    DeliveryListComponent,
    DeliveryPalletesPerClientComponent,
    ModalComponentComponent,
    OnlyNumberDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AlertsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDXjDRoDkUDW3R_oWRhtu56OHGjjR-yvQA'
    }),
    ModalDialogModule.forRoot(),
    MatSelectModule,
    BrowserAnimationsModule,
    SignaturePadModule,
    AngularFileUploaderModule
  ],
  entryComponents: [ ModalComponentComponent ],

  providers: [AuthService, AuthGuard, PaletService, CanDeactivateGuard, DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
