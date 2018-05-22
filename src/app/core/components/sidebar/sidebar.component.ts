import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from './../../services/auth.service';
import { Subscription } from "rxjs";
import { LayoutService } from "./../../services/layout.service";
import { Router } from "@angular/router";
import { MatDrawer } from '@angular/material/sidenav';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('snav') snav: MatDrawer;
  sub: Subscription;
  showSidebar = false;

  ngOnInit() {

  }
 
  ngAfterViewInit() {
    // this.sub = this.layoutService.sidebarChange$.subscribe(x => {
    //   console.log('sidebar ', x);
    //   this.showSidebar = x;
    //   if (!x) this.snav.close();
    // });
  }
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, public auth: AuthService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  logout() {
    this.auth.logout()
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.sub.unsubscribe();
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}