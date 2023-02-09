import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PredictionWithAiRoutingModule } from './prediction-with-ai-routing.module';
import {
  TimeCoastPredictionComponent
} from '@privateLayout/features/prediction-with-ai/time-coast-prediction/time-coast-prediction.component';
import { SharedModule } from '@shared/shared.module';
import { PredictionActivitiesListComponent } from './time-coast-prediction/prediction-activities-list/prediction-activities-list.component';


@NgModule({
  declarations: [
    TimeCoastPredictionComponent,
    PredictionActivitiesListComponent
  ],
  imports: [
    CommonModule,
    PredictionWithAiRoutingModule,
    SharedModule
  ]
})
export class PredictionWithAiModule { }
