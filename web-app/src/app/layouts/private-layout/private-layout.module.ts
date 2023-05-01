import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrivateLayoutComponent} from './private-layout.component';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  exports: [

  ],
  declarations: [
    PrivateLayoutComponent,
  ],
  imports: [
    CommonModule,
    AppSharedModule,
    SharedModule,
  ]
})
export class PrivateLayoutModule {
}
