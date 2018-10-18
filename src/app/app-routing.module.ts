import { DeliveryPalletesPerClientComponent } from './delivery-palletes-per-client/delivery-palletes-per-client.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListOfPaletsComponent } from './list-of-palets/list-of-palets.component';
import { PageNotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'paletList',
  component: ListOfPaletsComponent, canActivate: [AuthGuard]
},
{
  path: 'deliveryRoute',
  component: DeliveryListComponent, canActivate: [AuthGuard]
},
{
  path: 'deliveryPalletesPerClient/:id',
  component: DeliveryPalletesPerClientComponent, canActivate: [AuthGuard],
  canDeactivate: [CanDeactivateGuard]
},
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
  {
    path: '**', component: PageNotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
