import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { SharedModule } from '@shared/shared.module';
import {
  DetailDocumentsProjetComponent
} from '@privateLayout/features/documents/detail-documents-projet/detail-documents-projet.component';
import {
  FiltreListDocumentsComponent
} from '@privateLayout/features/documents/detail-documents-projet/filtre-list-documents/filtre-list-documents.component';


@NgModule({
  declarations: [
    DetailDocumentsProjetComponent,
    FiltreListDocumentsComponent
  ],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    SharedModule
  ]
})
export class DocumentsModule { }
