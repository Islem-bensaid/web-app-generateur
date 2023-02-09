import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule as AppSharedModule } from 'src/app/shared/shared.module';

const widgets = [];
const pipes = [];
const directives = [];

@NgModule({
  exports: [
    ...widgets,
    ...pipes,
    ...directives
  ],
  declarations: [
    ...widgets,
    ...pipes,
    ...directives
  ],
  imports: [
    CommonModule,
    AppSharedModule
  ]
})
export class SharedModule { }
