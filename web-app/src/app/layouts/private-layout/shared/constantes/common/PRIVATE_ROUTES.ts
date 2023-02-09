import { Routes } from '@angular/router';
export const PRIVATE_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'prj/l',
    pathMatch: 'full'
  },
  {
    path: 'adm',
    data: {
      title: 'adm.admin',
      breadcrumb: 'adm.admin',
    },
    loadChildren: () => import('../../../features/administration/administration.module').then((m) => m.AdministrationModule)
  },
  {
    path: 'prj',
    loadChildren: () => import('../../../features/projet/projet.module').then((m) => m.ProjetModule)
  },
  {
    path: 'ai',
    loadChildren: () => import('../../../features/prediction-with-ai/prediction-with-ai.module').then((m) => m.PredictionWithAiModule)
  },
  {
    path: 'simulation',
    loadChildren: () => import('../../../features/simulation-3-d/simulation-3-d.module').then((m) => m.Simulation3DModule)
  },
  {
    path: 'media',
    data: {
      title: 'media.title',
      breadcrumb: 'media.title',
    },
    loadChildren: () => import('../../../features/media/media.module').then((m) => m.MediaModule)
  },
  {
    path: 'documents',
    data: {
      title: 'documents.title',
      breadcrumb: 'documents.title',
    },
    loadChildren: () => import('../../../features/documents/documents.module').then((m) => m.DocumentsModule)
  },

]
