import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    ...directives,
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
