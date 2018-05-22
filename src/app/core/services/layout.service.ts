import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LayoutService {
  isSidebarVisible = false;
  private _subject = new BehaviorSubject<boolean>(false);
  sidebarChange$ = this._subject.asObservable();
  constructor() { }
  showSidebar() {
    this.isSidebarVisible = true;
    this._subject.next(true);
  }
  hideSidebar() {
    this.isSidebarVisible = false;
    this._subject.next(false);
  }
}