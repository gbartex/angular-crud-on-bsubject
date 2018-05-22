import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../core/services/auth.service';
import { Router } from "@angular/router";
import { LayoutService } from './../../../core/services/layout.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [``]
})
export class LoginComponent {
  login = "admin";
  password = "pass";
  constructor(private auth: AuthService, private layoutService: LayoutService, private router: Router) { }

  onSubmit() {
    this.auth.login(this.login, this.password)
      .then(
      this.onSubmitSuccess.bind(this)
      , this.onSubmitFailure);
  }
  onSubmitSuccess() {
    this.router.navigate(['users']).then(() => this.layoutService.showSidebar());
  }
  onSubmitFailure() {
    console.log('failure');
  }
}