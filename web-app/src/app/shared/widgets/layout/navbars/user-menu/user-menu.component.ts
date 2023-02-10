import { Component, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppTranslateService, AuthentificationService, ToastService } from '@shared/services';
import { defaultAvatar } from '@shared/constantes';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ForgeAuthentificationService } from '@privateLayout/shared/services/forge-authentification.service';

@Component({
  selector: 'st2i-user-menu',
  templateUrl: './user-menu.component.html'
})
export class UserMenuComponent {
  avatar: string;
  @Input() isContentLayout = false;
  @Input() inputData: any;
  isSmallScreen = false;

  userInfo: { fullName: string, profile: string } = {
    fullName: 'Foulen Ben Foulen',
    profile: 'User'
  };
  defaultAvatar = defaultAvatar;

  constructor(
    private authService: AuthentificationService,
    private forgeAuthentificationService: ForgeAuthentificationService,
    private dialog: MatDialog,
    private toast: ToastService,
    private appTranslateService: AppTranslateService,
    private breakpointObserver: BreakpointObserver
  ) {

  }

  ngOnInit() {
     // this.getUser();
    this.breakpointObserver
      .observe(['(max-width: 599px)'])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { inputData } = changes;
    if (inputData?.currentValue != inputData?.previousValue) {
      this.inputData = inputData?.currentValue;
    }
  }

  logout() {
    this.authService.logout();
    this.forgeAuthentificationService.logout();
  }

  getUser() {
    this.userInfo.fullName = this.authService.authenticatedUser.nom + ' ' + this.authService.authenticatedUser.prenom;
    this.userInfo.profile = this.authService.authenticatedUser.email;
  }

  style() {
    return {
      'background-image': `url(${defaultAvatar})`
    };
  }
}
