import { Component, ElementRef, HostListener, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { AppTranslateService, LoadingService } from '@shared/services';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Menu } from '@shared/models';
import { CONFIG } from '@shared/constantes/config';

@Component({
  selector: 'st2i-private-layout-sidebar',
  templateUrl: './private-layout-sidebar.component.html',
  styleUrls: ['./private-layout-sidebar.component.css']
})
export class PrivateLayoutSidebarComponent implements OnInit {
  PRIVATE_LAYOUT_CONFIG = CONFIG.PRIVATE_LAYOUT;


  @ViewChild('sidebar', { static: false }) sidebar: MatSidenav;

  @Input() listMenus: Menu[];
  expanded = {};
  @Input() topGap: number = 85;
  @Input() static bottomGap: number = 0;
  isSmallScreen: boolean;
  get getBottomGap() {return PrivateLayoutSidebarComponent.bottomGap;}
  mode: MatDrawerMode;
  isFixedInViewPort: boolean;
  loading: boolean = true;
  onLoadingMenu: boolean = true;

  headerPosition: any;
  headerSticky: boolean;

  constructor(
    public appTranslateService: AppTranslateService,
    private breakpointObserver: BreakpointObserver,
    private _loading: LoadingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initStyle();
    this.isFixedInViewPort = true;
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
        this.mode = this.isSmallScreen ? 'over' : 'side';
      });
    // this.listenToLoading();

  }

  ngOnChanges(changes: SimpleChanges): void {
    const { listMenus } = changes;
    if (listMenus?.currentValue != listMenus?.previousValue) {
      this.listMenus = listMenus?.currentValue;
      this.initExpantionList();
      if (this.listMenus) {
        this.onLoadingMenu = false;
      }
    }
  }

  initStyle() {
    const parsePxToInt = (px: string) => {
      return parseInt(px.replace('px', ''));
    };
    // window.onscroll = function(ev) {
    //   PrivateLayoutSidebarComponent.bottomGap = (window.innerHeight + window.scrollY) >= document.body.offsetHeight ? parsePxToInt(CONFIG.PRIVATE_LAYOUT.footer.max_height.gt_md) : 0;
    // };

    (document.querySelector(':root') as HTMLElement).style.setProperty('--sidebar-background-color', CONFIG.PRIVATE_LAYOUT.sidebar['background-color']);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--sidebar-width', CONFIG.PRIVATE_LAYOUT.sidebar.width);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--sidebar-header-height', document.getElementById('private-layout-navbar').getBoundingClientRect().height + 'px');
    (document.querySelector(':root') as HTMLElement).scrollWidth

  }

  hasSubMenu(menuItem: Menu) {
    return Array.isArray(menuItem.submenus) && menuItem.submenus.length !== 0;
  }

  getMargin(niv: number) {
    const name =
      (this.appTranslateService.currentLanguage === 'fr' || this.appTranslateService.currentLanguage === 'en')
        ? 'padding-left'
        : 'padding-right';
    return {
      [name]: niv * 1.875 + 'rem'
    };
  }

  initExpantionList() {
    this.listMenus.forEach((m: Menu, index: number) => {
      if (this.hasSubMenu(m)) {
        this.expanded[index] = false;
        m.submenus.forEach((sm: Menu, index1: number) => {
          if (this.hasSubMenu(sm)) {
            this.expanded[index + '' + index1] = false;
          }
        });
      }
    });
  }

  _setMenuStyle(menuId) {
    Array.from(document.getElementsByClassName('menu-item active')).forEach(node => (node['classList']?.remove('active')));
    document.querySelector(`[menu-id= "${menuId}"]`)?.classList.add('active');
  }

  onMenuClick(menuId, index: any, index1: any = '') {
    for (const idx in this.expanded) {
      if (index1 === '') {
        this.expanded[idx] =
          index + '' + index1 == idx
            ? !this.expanded[index + '' + index1]
            : false;
      } else {
        if (idx.length === 2) {
          this.expanded[idx] =
            index + '' + index1 == idx
              ? !this.expanded[index + '' + index1]
              : false;
        }
      }
    }

    this._setMenuStyle(menuId);
  }

  toggleSidebar(event) {
    this.sidebar.toggle();
  }

  printOpen() {
    this.isFixedInViewPort = true;
  }

  printClose() {
    this.isFixedInViewPort = false;
  }

  // listenToLoading(): void {
  //   this._loading.loadingSub
  //     .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
  //     .subscribe((loading) => {
  //       this.loading = loading;
  //     });
  // }

  getMenuHeight(titleLength: number) {
    return (Math.floor(titleLength / 24) + 1) * 24 + 32;
  }

  onScroll(event) {
    console.log('event', event);
  }
}
