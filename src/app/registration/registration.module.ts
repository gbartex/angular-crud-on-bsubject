import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UserService } from './services/user.service';
import { MessageApiComponent } from './../core/components/message-api/message-api.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DashboardComponent } from './components/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { CoreModule } from './../core/core.module';
import { ZipCodeService } from './services/zip-code.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    RegistrationRoutingModule
  ],
  entryComponents: [MessageApiComponent],
  declarations: [AddUserComponent, UserListComponent, DashboardComponent],
  providers: [UserService, ZipCodeService]
})
export class RegistrationModule { }