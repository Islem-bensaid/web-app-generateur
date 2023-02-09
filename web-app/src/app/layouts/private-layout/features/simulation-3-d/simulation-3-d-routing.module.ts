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
import {
  FicheSimulation3DComponent
} from '@privateLayout/features/simulation-3-d/fiche-simulation3-d/fiche-simulation3-d.component';

const routes: Routes = [
  {
    path: 'pl',
    data: {
      title: 'simulation.title',
      breadcrumb: 'simulation.title',
      type: ROUTING_TYPES['3D']
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent,
      },
      {
        path: 'f/:idProjet',
        data: {
          title: 'simulation.f.title',
          breadcrumb: 'simulation.f.title',
          type: ROUTING_TYPES['3DD']
        },
        children: [
          {
            path: "",
            component: FicheSimulation3DComponent,
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
export class Simulation3DRoutingModule { }
