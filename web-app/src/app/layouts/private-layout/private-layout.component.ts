import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '@publicLayout/shared/services/authentification/authentification.service';
import { AppTranslateService, LoadingService, ToastService } from '@shared/services';
import { SharedService } from '@shared/services/sharedWs/shared.service';
import { Menu, RequestObject } from '@shared/models';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { ResponseObject } from '@shared/models/ResponseObject';
import { delay } from 'rxjs/operators';
import { COMMON_OTHER_URI } from '@privateLayout/shared/constantes/common/common-uri';
import { ForgeAuthentificationService } from '@privateLayout/shared/services/forge-authentification.service';
import { CONFIG } from '@shared/constantes/config';
import { isEmptyValue } from '@shared/tools';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css']
})
export class PrivateLayoutComponent implements OnInit {


  listMenus: Menu[];
  loading: boolean = true;
  mainPanelHeight: string = '100vh';
isSmallScreen: boolean;

  constructor(
    private authentificationService: AuthentificationService,
    private appTranslateService: AppTranslateService,
    private toast: ToastService,
    private sharedService: SharedService,
    private _loading: LoadingService,
    private forgeAuthentificationService: ForgeAuthentificationService,
    private breakpointObserver: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
    this.initStyles();
    this.listenToLoading();
    this.getMenu();
    this.authentificateToForge();
  }


  initStyles() {
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });

    const parsePxToInt = (px: string) => {
      return parseInt(px.replace('px', ''));
    };

    this.mainPanelHeight = (document.documentElement.clientHeight - parsePxToInt(CONFIG.PRIVATE_LAYOUT.navbar['min-height']['gt-md']) - parsePxToInt(CONFIG.PRIVATE_LAYOUT.footer.max_height.gt_md)) + 'px';
  }

  getMenu() {
    const request: RequestObject = <RequestObject>{
      uri: COMMON_OTHER_URI.GET_MENU,
      params: {
        query: {
          lang: this.appTranslateService.getDefaultLang()
        }
      },
      microservice: ConstanteWs._CODE_ADMINISTRATION,
      method: ConstanteWs._CODE_GET
    };
    this.sharedService.commonWs(request).subscribe({
      next: (response: ResponseObject) => {
        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
          this.listMenus = <Menu[]>response.payload;
        } else {
          console.error(`Error in PrivateLayoutComponent/getMenu, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        console.error(`Error in PrivateLayoutComponent/getMenu, error :: ${error}`);
        this.toast.error();
      }
    });
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }

  authentificateToForge() {
    if (isEmptyValue(ForgeAuthentificationService.getForgeAccessToken)) {
      this.forgeAuthentificationService.authenticate().subscribe();
    }
  }
}

