import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { LiveCameraComponent } from './live-camera/live-camera.component';
import { SharedModule } from '@shared/shared.module';
import { DialogAddEditCameraComponent } from './live-camera/dialog-add-edit-camera/dialog-add-edit-camera.component';
import {
  DetailMediaProgressComponent
} from '@privateLayout/features/media/detail-media-progress/detail-media-progress.component';
import {
  FiltreListMediasComponent
} from '@privateLayout/features/media/detail-media-progress/filtre-list-medias/filtre-list-medias.component';
import { MatStepperModule } from '@angular/material/stepper';
import { DetailProjetMediaComponent } from './detail-projet-media/detail-projet-media.component';
import { FiltreLiveCameraComponent } from './live-camera/filtre-live-camera/filtre-live-camera.component';


@NgModule({
  declarations: [
    LiveCameraComponent,
    DialogAddEditCameraComponent,
    DetailMediaProgressComponent,
    FiltreListMediasComponent,
    DetailProjetMediaComponent,
    FiltreLiveCameraComponent
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    SharedModule,
    MatStepperModule
  ]
})
export class MediaModule { }
