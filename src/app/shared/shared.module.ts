import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from '../material-components/material-components.module';
import { ShortcutPipe } from './pipes/shortcut.pipe';
import { DefaultPipe } from './pipes/default.pipe';
import { CsValidators } from './validators/cs-validators';


@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  declarations: [ShortcutPipe, DefaultPipe],
  exports: [ ShortcutPipe, DefaultPipe]
})
export class SharedModule {

}