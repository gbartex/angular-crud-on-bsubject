import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CanDeactivate } from '@angular/router';
import { of } from 'rxjs/observable/of';

export interface CanBeDeactivate {
  canDeactivate: () => Observable<boolean>;
}

@Injectable()
export class CanLeaveGuard implements CanDeactivate<CanBeDeactivate> {
  canDeactivate(component: CanBeDeactivate): Observable<boolean> | Promise<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : of(true);
  }
}
