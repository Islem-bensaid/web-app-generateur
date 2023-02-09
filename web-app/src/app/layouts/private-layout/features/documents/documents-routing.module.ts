import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTING_TYPES } from '@privateLayout/shared/constantes/common/Constantes';
import {
  FicheListeProjetComponent
} from '@privateLayout/features/projet/fiche-liste-projet/fiche-liste-projet.component';
import {
  DetailProjetMediaComponent
} from '@privateLayout/features/media/detail-projet-media/detail-projet-media.component';
import {
  DetailDocumentsProjetComponent
} from '@privateLayout/features/documents/detail-documents-projet/detail-documents-projet.component';

const routes: Routes = [
  {
    path: 'hse',
    data: {
      title: 'documents.hseRepots',
      breadcrumb: 'documents.hseRepots',
      type: ROUTING_TYPES.HSER
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'mom',
    data: {
      title: 'documents.MOM',
      breadcrumb: 'documents.MOM',
      type: ROUTING_TYPES.MOM
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'rr',
    data: {
      title: 'documents.RR',
      breadcrumb: 'documents.RR',
      type: ROUTING_TYPES.RR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'mr',
    data: {
      title: 'documents.MR',
      breadcrumb: 'documents.MR',
      type: ROUTING_TYPES.MR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'dr',
    data: {
      title: 'documents.DR',
      breadcrumb: 'documents.DR',
      type: ROUTING_TYPES.DR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'ddra',
    data: {
      title: 'documents.DDra',
      breadcrumb: 'documents.DDra',
      type: ROUTING_TYPES.DDra
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'id',
    data: {
      title: 'documents.ID',
      breadcrumb: 'documents.ID',
      type: ROUTING_TYPES.ID
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'sd',
    data: {
      title: 'documents.SD',
      breadcrumb: 'documents.SD',
      type: ROUTING_TYPES.SD
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'ad',
    data: {
      title: 'documents.AD',
      breadcrumb: 'documents.AD',
      type: ROUTING_TYPES.AD
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'rfi',
    data: {
      title: 'documents.RFI',
      breadcrumb: 'documents.RFI',
      type: ROUTING_TYPES.RFI
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'mir',
    data: {
      title: 'documents.MIR',
      breadcrumb: 'documents.MIR',
      type: ROUTING_TYPES.MIR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'ms',
    data: {
      title: 'documents.MS',
      breadcrumb: 'documents.MS',
      type: ROUTING_TYPES.MS
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'wir',
    data: {
      title: 'documents.WIR',
      breadcrumb: 'documents.WIR',
      type: ROUTING_TYPES.WIR
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'si',
    data: {
      title: 'documents.SI',
      breadcrumb: 'documents.SI',
      type: ROUTING_TYPES.SI
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'ncrs',
    data: {
      title: 'documents.NCRs',
      breadcrumb: 'documents.NCRs',
      type: ROUTING_TYPES.NCRs
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'nc',
    data: {
      title: 'documents.NC',
      breadcrumb: 'documents.NC',
      type: ROUTING_TYPES.NC
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'vreq',
    data: {
      title: 'documents.VReq',
      breadcrumb: 'documents.VReq',
      type: ROUTING_TYPES.VReq
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'av',
    data: {
      title: 'documents.AV',
      breadcrumb: 'documents.AV',
      type: ROUTING_TYPES.AV
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'pc',
    data: {
      title: 'documents.PC',
      breadcrumb: 'documents.PC',
      type: ROUTING_TYPES.PC
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
  {
    path: 'mreg',
    data: {
      title: 'documents.MReg',
      breadcrumb: 'documents.MReg',
      type: ROUTING_TYPES.MReg
    },
    children: [
      {
        path: '',
        component: FicheListeProjetComponent
      },
      {
        path: 'd/:idProjet',
        component: DetailDocumentsProjetComponent,
        data: {
          title: 'general.details',
          breadcrumb: 'general.details',
          // type: ROUTING_TYPES.PRD
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsRoutingModule { }
