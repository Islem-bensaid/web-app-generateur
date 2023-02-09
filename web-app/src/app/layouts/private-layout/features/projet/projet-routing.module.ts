import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditProjetComponent } from '@privateLayout/features/projet/add-edit-projet/add-edit-projet.component';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import {
  FicheListeProjetComponent
} from '@privateLayout/features/projet/fiche-liste-projet/fiche-liste-projet.component';
import { DetailProjetD5Component } from '@privateLayout/features/projet/detail-projet-d5/detail-projet-d5.component';
import { DetailProjetComponent } from '@privateLayout/features/projet/detail-projet/detail-projet.component';
import { DetailProjetD4Component } from '@privateLayout/features/projet/detail-projet-d4/detail-projet-d4.component';
import {
  DashboardDetailsComponent
} from '@privateLayout/features/projet/dashboard-details/dashboard-details.component';
import {
  DetailMediaProgressComponent
} from '@privateLayout/features/media/detail-media-progress/detail-media-progress.component';

const routes: Routes = [
  {
    path: 'a',
    data: {
      title: 'gp.ap.title',
      breadcrumb: 'gp.ap.title',
      type: ROUTING_TYPES.AP
    },
    component: AddEditProjetComponent
  },
  {
    path: 'a/:idProjet',
    data: {
      title: 'gp.ap.title',
      breadcrumb: 'gp.ap.title',
      type: ROUTING_TYPES.AP
    },
    component: AddEditProjetComponent
  },
  {
    path: 'm/:idProjet',
    data: {
      title: 'gp.ep.title',
      breadcrumb: 'gp.ep.title',
      type: ROUTING_TYPES.EP
    },
    component: AddEditProjetComponent
  },
  {
    path: 'd',
    data: {
      title: 'gp.dp.title',
      breadcrumb: 'gp.dp.title',
      type: ROUTING_TYPES.DP
    },
    component: DetailProjetComponent
  },
  {
    path: 'l',
    data: {
      title: 'gp.lp.title',
      breadcrumb: 'gp.lp.title',
      type: ROUTING_TYPES.LP
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailProjetComponent,
        data: {
          title: 'gp.lp.children.ficheDetailsProjet.title',
          breadcrumb: 'gp.lp.children.ficheDetailsProjet.title',
          type: ROUTING_TYPES.LPD
        }
      }
    ]
  },
  {
    path: '5d',
    data: {
      title: 'gp.5d.title',
      breadcrumb: 'gp.5d.title',
      type: ROUTING_TYPES.D5
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailProjetD5Component,
        data: {
          title: 'gp.5d.ficheProject5DDetails.title',
          breadcrumb: 'gp.5d.ficheProject5DDetails.title',
          type: ROUTING_TYPES.D5D
        }
      }
    ]
  },
  {
    path: '4d',
    data: {
      title: 'gp.4d.title',
      breadcrumb: 'gp.4d.title',
      type: ROUTING_TYPES.D4
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailProjetD4Component,
        data: {
          title: 'gp.5d.ficheProject5DDetails.title',
          breadcrumb: 'gp.5d.ficheProject5DDetails.title',
          type: ROUTING_TYPES.D5D
        }
      }
    ]
  },
  {
    path: 'dashboard',
    data: {
      title: 'gp.dashboard.title',
      breadcrumb: 'gp.dashboard.title',
      type: ROUTING_TYPES.D
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DashboardDetailsComponent,
        data: {
          title: 'gp.dashboard.dashboardDetails.title',
          breadcrumb: 'gp.dashboard.dashboardDetails.title',
          type: ROUTING_TYPES.DD
        }
      }
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjetRoutingModule {
}
