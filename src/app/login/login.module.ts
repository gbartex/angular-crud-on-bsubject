import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from './../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  exports:[LoginComponent],
  declarations: [LoginComponent]
})
export class LoginModule { }