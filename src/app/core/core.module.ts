import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ErrorComponent } from './components/error.component';
import { RouterModule } from '@angular/router';
import { MaterialComponentsModule } from './../material-components/material-components.module';
import { DataApiService } from './services/data-api.service';
import { AuthService } from './services/auth.service';
import { LayoutService } from './services/layout.service';
import { CanLeaveGuard } from './services/can-leave.guard';
import { DialogConfirmComponent } from "./../material-components/components/dialog-confirm/dialog-confirm.component";

import { MessageApiComponent } from './components/message-api/message-api.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialComponentsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DialogConfirmComponent,MessageApiComponent
  ],
  declarations: [MessageApiComponent,ErrorComponent,SidebarComponent],
  exports: [
    CommonModule,
    SidebarComponent,
    RouterModule,
    ErrorComponent,
    MaterialComponentsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        Title,
        DatePipe,
        LayoutService,
        CanLeaveGuard,
        AuthService
      ]
    };
  }
}