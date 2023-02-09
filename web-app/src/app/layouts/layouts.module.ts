import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';
import { PublicLayoutModule } from '@publicLayout/public-layout.module';
import { PrivateLayoutModule } from '@privateLayout/private-layout.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    AppSharedModule,
    PublicLayoutModule,
    PrivateLayoutModule,
  ],
  exports: [
    PublicLayoutModule,
    PrivateLayoutModule
  ]
})
export class LayoutsModule {
}
