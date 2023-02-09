import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveCameraComponent } from '@privateLayout/features/media/live-camera/live-camera.component';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import {
  FicheListeProjetComponent
} from '@privateLayout/features/projet/fiche-liste-projet/fiche-liste-projet.component';
import {
  DetailMediaProgressComponent
} from '@privateLayout/features/media/detail-media-progress/detail-media-progress.component';
import {
  DetailProjetMediaComponent
} from '@privateLayout/features/media/detail-projet-media/detail-projet-media.component';

const routes: Routes = [
  {
    path: 'pr',
    data: {
      title: 'media.pr/vr.titlePr',
      breadcrumb: 'media.pr/vr.titlePr',
      type: ROUTING_TYPES.PR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailProjetMediaComponent,
        data: {
          title: 'media.pr/vr.details.title',
          breadcrumb: 'media.pr/vr.details.title',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'vr',
    data: {
      title: 'media.pr/vr.titleVr',
      breadcrumb: 'media.pr/vr.titleVr',
      type: ROUTING_TYPES.VR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailProjetMediaComponent,
        data: {
          title: 'media.pr/vr.details.title',
          breadcrumb: 'media.pr/vr.details.title',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'lc',
    data: {
      title: 'media.lc.title',
      breadcrumb: 'media.lc.title',
      type: ROUTING_TYPES.LC
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: LiveCameraComponent,
        data: {
          title: 'media.lc.content.title',
          breadcrumb: 'media.lc.content.title',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
