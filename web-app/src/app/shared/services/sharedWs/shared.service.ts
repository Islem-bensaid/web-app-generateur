import {Injectable} from '@angular/core';
import {RequestObject, SearchObject} from '@shared/models';
import { Observable, Observer } from 'rxjs';
import { WsFactory } from '@shared/tools/utils/ws-factory';
import {map} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AppTranslateService} from "@shared/services";
import {ComponentType} from "@angular/cdk/overlay";

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor(
      private wsFactory : WsFactory,
      private dialog: MatDialog,
      private appTranslateService: AppTranslateService
  ) {
  }

  commonWs(request: RequestObject): Observable<any> {
    return this.wsFactory.callFunction(request);
  }

  dateNow() {
    return new Promise(resolve => {
      this.wsFactory.callGatewayDateNowPromise().subscribe(dateNow => resolve(dateNow));
    });
  }

  async getListNm(nmType: string, searchObject?: SearchObject, method?: 'POST' | 'GET') {
    return await this.wsFactory.calListNm(nmType, searchObject, method);
  }

  openDialog(dialog: ComponentType<any>,metadata?: object, width: string = '68%'): Observable<any> {
    return this.dialog.open(dialog, {
      disableClose: true,
      width: width,
      direction: this.appTranslateService.getDir(),
      autoFocus: true,
      data: metadata,
    }).afterClosed().pipe(map((response) => response.data));
  }


}
