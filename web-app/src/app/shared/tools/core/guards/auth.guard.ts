import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthentificationService } from '@publicLayout/shared/services/authentification/authentification.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authentificationService: AuthentificationService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
    return new Observable((subscriber) => {
      this.authentificationService.isUserAuthentificated().subscribe((isAuthentificated: boolean) => {
        if (!isAuthentificated) {
          this.router.navigate(['']);
          subscriber.next(false);
        } else {
          subscriber.next(true);
        }
      });
    });
  }
}
