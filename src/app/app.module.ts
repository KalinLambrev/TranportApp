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
import { RouterModule } from '@angular/router';
import { ListOfPaletsComponent } from './list-of-palets/list-of-palets.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './not-found/not-found.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { AlertsModule } from 'angular-alert-module';
import { AgmCoreModule } from '@agm/core';
import { DeliveryPalletesPerClientComponent } from './delivery-palletes-per-client/delivery-palletes-per-client.component';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { OnlyNumberDirective } from './only-number.directive';
import {MatSelectModule} from '@angular/material/select';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListOfPaletsComponent,
    PageNotFoundComponent,
    DeliveryListComponent,
    DeliveryPalletesPerClientComponent,
    OnlyNumberDirective,
    DialogComponent
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
    AngularFileUploaderModule,
    MatDialogModule
  ],
  entryComponents: [DialogComponent, DeliveryListComponent],

  providers: [AuthService, AuthGuard, PaletService, CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
