import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Simulation3DRoutingModule } from './simulation-3-d-routing.module';
import { FicheSimulation3DComponent } from './fiche-simulation3-d/fiche-simulation3-d.component';
import { SharedModule } from '@shared/shared.module';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [
    FicheSimulation3DComponent
  ],
  imports: [
    CommonModule,
    Simulation3DRoutingModule,
    SharedModule,
    MatSliderModule
  ]
})
export class Simulation3DModule { }
