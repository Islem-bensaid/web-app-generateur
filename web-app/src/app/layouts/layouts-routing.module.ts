import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicLayoutComponent } from '@publicLayout/public-layout.component';
import { PrivateLayoutComponent } from '@privateLayout/private-layout.component';
import { PRIVATE_ROUTES } from '@privateLayout/shared/constantes/common/PRIVATE_ROUTES';
import { PageNotFoundComponent } from '@shared/widgets';
import { AuthGuard } from '@shared/tools/core/guards/auth.guard';
import { NonAuthGuard } from '@shared/tools/core/guards/non-auth.guard';
import { PUBLIC_ROUTES } from '@publicLayout/shared/routes/PUBLIC_ROUTES';


const LAYOUTS_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full'
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children: PUBLIC_ROUTES,
     canActivate: [NonAuthGuard]
  },
  {
    path: 'app',
    component: PrivateLayoutComponent,
    children: PRIVATE_ROUTES,
    //canActivate: [AuthGuard],
    data: {
      title: 'general.title'
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(LAYOUTS_ROUTES)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule {
}
