import { Routes } from '@angular/router';
export const PRIVATE_ROUTES: Routes = [

  // {
  //   path: 'adm',
  //   data: {
  //     title: 'adm.admin',
  //     breadcrumb: 'adm.admin',
  //   },
  //   loadChildren: () => import('../../../features/administration/administration.detail-front').then((m) => m.AdministrationModule)
  // },
  {
    path: 'gen',
    data: {
      title: "Génerateur d'application",
      breadcrumb: 'Génerateur d\'application',
    },
    loadChildren: () => import('../../../features/generateur/generateur.module').then((m) => m.GenerateurModule)
  },







]
