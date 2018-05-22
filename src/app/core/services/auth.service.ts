import { Injectable } from '@angular/core';
import { LayoutService } from './layout.service';
@Injectable()
export class AuthService {
  private credentials = {
    login: 'admin',
    password: 'pass'
  }
  constructor(private layoutService: LayoutService) { }
  private isUserLoggedIn = false;
  login(login: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.credentials.login === login && this.credentials.password === password) {
        this.isUserLoggedIn = true;
        this.layoutService.showSidebar();
        resolve();
      } else {
        this.isUserLoggedIn = false;
        this.layoutService.hideSidebar();
        reject();
      }
    });
  }
  isLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }
  logout() {
    this.isUserLoggedIn = false;
  }
}