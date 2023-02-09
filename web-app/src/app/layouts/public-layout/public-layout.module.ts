import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { PublicLayoutComponent } from './public-layout.component';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    PublicLayoutComponent
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    SharedModule
  ]
})
export class PublicLayoutModule {
}
