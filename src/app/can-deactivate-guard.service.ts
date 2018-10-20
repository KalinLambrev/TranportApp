import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
           route: ActivatedRouteSnapshot,
           state: RouterStateSnapshot) {

     const url: string = state.url;
     console.log('Url: ' + url);

     return component.canDeactivate ? component.canDeactivate() : true;
  }
}