import { Routes } from '@angular/router';
export const PRIVATE_ROUTES: Routes = [

  {
    path: 'adm',
    data: {
      title: 'adm.admin',
      breadcrumb: 'adm.admin',
    },
    loadChildren: () => import('../../../features/administration/administration.module').then((m) => m.AdministrationModule)
  },


]
