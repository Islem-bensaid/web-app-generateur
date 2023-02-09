import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjetRoutingModule } from './projet-routing.module';
import { AddEditProjetComponent } from './add-edit-projet/add-edit-projet.component';
import { SharedModule } from '@shared/shared.module';
import { DetailProjetComponent } from './detail-projet/detail-projet.component';
import { FicheListeProjetComponent } from './fiche-liste-projet/fiche-liste-projet.component';
import { FiltreListeProjetComponent } from './fiche-liste-projet/filtre-liste-projet/filtre-liste-projet.component';
import { DetailProjetD5Component } from './detail-projet-d5/detail-projet-d5.component';
import { FiltreListTasksComponent } from './detail-projet-d5/filtre-list-tasks/filtre-list-tasks.component';
import { DetailProjetD4Component } from './detail-projet-d4/detail-projet-d4.component';
import { NgGanttEditorModule } from 'ng-gantt';
import { ViewerFilterComponent } from './detail-projet-d5/viewer-filter/viewer-filter.component';
import { DashboardDetailsComponent } from './dashboard-details/dashboard-details.component';
import { LineChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { AddEditContactDialogComponent } from './add-edit-projet/add-edit-contact-dialog/add-edit-contact-dialog.component';
import { MatStepperModule } from '@angular/material/stepper';
import {
  TreeViewBimDocManagementComponent
} from '@privateLayout/features/projet/add-edit-projet/tree-view-bim-doc-management/tree-view-bim-doc-management.component';
import { MatTreeModule } from '@angular/material/tree';
import { D4FilterTasksComponent } from './detail-projet-d4/d4-filter-tasks/d4-filter-tasks.component';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { DialogAddExecutiveReportComponent } from './dashboard-details/dialog-add-executive-report/dialog-add-executive-report.component';
import { DialogAddAreaComponent } from './dashboard-details/dialog-add-area/dialog-add-area.component';


@NgModule({
  declarations: [
    AddEditProjetComponent,
    DetailProjetComponent,
    FicheListeProjetComponent,
    FiltreListeProjetComponent,
    DetailProjetD5Component,
    FiltreListTasksComponent,
    DetailProjetD4Component,
    ViewerFilterComponent,
    DashboardDetailsComponent,
    AddEditContactDialogComponent,
    TreeViewBimDocManagementComponent,
    D4FilterTasksComponent,
    DialogAddExecutiveReportComponent,
    DialogAddAreaComponent,
  ],
  imports: [
    CommonModule,
    ProjetRoutingModule,
    SharedModule,
    NgGanttEditorModule,
    LineChartModule,
    NgxChartsModule,
    MatStepperModule,
    MatTreeModule,
    ViewerModule
  ]
})
export class ProjetModule { }
