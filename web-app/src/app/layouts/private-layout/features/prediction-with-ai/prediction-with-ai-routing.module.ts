import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import {
  FicheListeProjetComponent
} from '@privateLayout/features/projet/fiche-liste-projet/fiche-liste-projet.component';
import {
  TimeCoastPredictionComponent
} from '@privateLayout/features/prediction-with-ai/time-coast-prediction/time-coast-prediction.component';
import {
  PredictionActivitiesListComponent
} from '@privateLayout/features/prediction-with-ai/time-coast-prediction/prediction-activities-list/prediction-activities-list.component';

const routes: Routes = [
  {
    path: 'pl',
    data: {
      title: 'ai.title',
      breadcrumb: 'ai.title',
      type: ROUTING_TYPES.AI
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent,
      },
      {
        path: 'tcp/:idProjet',
        data: {
          title: 'ai.tcp.title',
          breadcrumb: 'ai.tcp.title',
          type: ROUTING_TYPES.AID
        },
        children: [
          {
            path: "",
            component: TimeCoastPredictionComponent,
          },
          {
            path: "act/:idAction",
            data: {
              title: 'ai.tcp.activitiesList.title',
              breadcrumb: 'ai.tcp.activitiesList.title',
            },
            component: PredictionActivitiesListComponent,
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PredictionWithAiRoutingModule { }
