import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DatenowService } from '@shared/services';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { CONFIG } from '@shared/constantes/config';

@Component({
  selector: 'st2i-private-layout-navbar',
  templateUrl: './private-layout-navbar.component.html',
  styleUrls: ['./private-layout-navbar.component.css']
})
export class PrivateLayoutNavbarComponent implements OnInit {
  @ViewChild('stickNavbar') navbar: ElementRef;


  flags:  {
    sidebarOpened: boolean;
    isSmallScreen: boolean
  } = {
    sidebarOpened: false,
    isSmallScreen: false
  }

  navbarPosition: any;
  sticky: boolean;


  @Output() toggleSidebarEventEmitter = new EventEmitter<boolean>();
  @Input() loggedUser: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    this.initStyle();
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.flags.sidebarOpened = !result.matches
        this.flags.isSmallScreen = result.matches
      });
  }

  ngAfterViewInit(){
    this.navbarPosition = this.navbar.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
    this.sticky = window.scrollY > this.navbarPosition;
  }



  toggleSidebar() {
    this.flags.sidebarOpened = !this.flags.sidebarOpened;
    this.toggleSidebarEventEmitter.emit(this.flags.sidebarOpened);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--sidebar-width', (this.flags.sidebarOpened? CONFIG.PRIVATE_LAYOUT.sidebar.width : '0px'));
  }

  private initStyle() {
    (document.querySelector(':root') as HTMLElement).style.setProperty('--navbar-height-lt-md', CONFIG.PRIVATE_LAYOUT.navbar['height']['lt-md']);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--navbar-height-gt-md', CONFIG.PRIVATE_LAYOUT.navbar['height']['gt-md']);
    (document.querySelector(':root') as HTMLElement).style.setProperty('--navbar-bg', CONFIG.PRIVATE_LAYOUT.navbar['background-color']);
  }
}
