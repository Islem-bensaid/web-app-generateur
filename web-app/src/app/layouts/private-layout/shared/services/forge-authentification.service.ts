import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '@shared/services';
import { PRL_OTHER_CODES } from '@privateLayout/shared/constantes/common/Constantes';
import { BIM360_URI } from '@privateLayout/shared/constantes/projet/bim360-uri';
import { urlJoin } from '@shared/tools';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgeAuthentificationService {

  static _CODE_TOKEN_KEY = PRL_OTHER_CODES.FORGE_TOKEN_KEY;

  forgeUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  forgeAuthenticatedUser: any;

  constructor(
    private http: HttpClient,
    private toast: ToastService
  ) {
  }

  setForgeUserLoggedIn(flag) {
    this.forgeUserLoggedIn.next(flag);
  }

  getForgeUserLoggedIn(): Observable<boolean> {
    return this.forgeUserLoggedIn.asObservable();
  }

  private static removeForgeAccessToken() {
    sessionStorage.removeItem(ForgeAuthentificationService._CODE_TOKEN_KEY);
  }

  private saveForgeAccessToken(ForgeAccessToken: any) {
    sessionStorage.setItem(ForgeAuthentificationService._CODE_TOKEN_KEY, ForgeAccessToken);
  }

  static get getForgeAccessToken() {
    return sessionStorage.getItem(ForgeAuthentificationService._CODE_TOKEN_KEY);
  }


  public authenticate() {
    const credentials = {
      client_id: environment.forgeProperties.cliendId,
      client_secret: environment.forgeProperties.client_secret,
      grant_type: 'client_credentials',
      scope: 'data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete code:all account:read viewables:read'
    };
    this.logout();
    const resource = urlJoin(environment.forgeProperties.hostSource, BIM360_URI.AUTHENTIFICATION);
    const body = new URLSearchParams();
    for (const [key, value] of Object.entries(credentials)) {
      body.set(key, value.toString());
    }
    return new Observable(subscriber => {
      this.http.post(resource, body.toString(), {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }).subscribe({
        next: (response: any) => {
          this.saveForgeAccessToken(response['access_token']);
          this.forgeAuthenticatedUser = response;
          this.forgeUserLoggedIn.next(true);
          subscriber.next(true);
        },
        error: (error) => {
          console.error(`Error in ForgeAuthentificationService/authentificate, error :: ${error}`);
          this.toast.error();
          this.forgeAuthenticatedUser = null;
          this.forgeUserLoggedIn.next(false);
          subscriber.next(true);
        }
      });
    });
  }

  // public refreshToken() {
  //   const credentials = {
  //     grant_type: 'client_credentials',
  //     scope: 'data:read data:write data:create bucket:read bucket:create account:read viewables:read'
  //   };
  //   const resource = urlJoin(environment.forgeProperties.hostSource, BIM360_URI.AUTHENTIFICATION);
  //   const body = new URLSearchParams();
  //   for (const [key, value] of Object.entries(credentials)) {
  //     body.set(key, value.toString());
  //   }
  //   const headers = new HttpHeaders();
  //   headers.set('Content-Type', 'application/x-www-form-urlencoded');
  //   headers.set('Accept', 'application/json');
  //   headers.set('Authorization', ForgeAuthentificationService.getForgeAccessToken);
  //   return new Observable(subscriber => {
  //     this.http.post(resource, body.toString(), { headers: headers }).subscribe({
  //       next: (response: any) => {
  //         this.saveForgeAccessToken(response['access_token']);
  //         this.forgeAuthenticatedUser = response;
  //         this.forgeUserLoggedIn.next(true);
  //         subscriber.next(true);
  //       },
  //       error: (error) => {
  //         console.error(`Error in ForgeAuthentificationService/refreshToken, error :: ${error}`);
  //         this.toast.error();
  //         this.forgeAuthenticatedUser = null;
  //         this.forgeUserLoggedIn.next(false);
  //         subscriber.next(true);
  //       }
  //     });
  //   });
  // }

  // private fetchWhoIam(authResponse) {
  //   if (!isEmptyValue(this.getForgeAccessToken())) {
  //       const request = <RequestObject>{
  //         uri: BIM360_URI.GET_HUB_ID,
  //         method: ConstanteWs._CODE_GET,
  //         server: ConstanteWs._CODE_FORGE_SERVER
  //       };
  //       this.sharedService.commonWs(request).subscribe({
  //         next: (response:any) => {
  //           authResponse['hub_id'] = response;
  //           this.forgeAuthenticatedUser = authResponse;
  //           this.forgeUserLoggedIn.next(true);
  //         },
  //         error: (error) => {
  //           console.error(`Error in ForgeAuthentificationService/fetchWhoIam, error :: ${error}`);
  //           this.toast.error();
  //           this.forgeAuthenticatedUser = null;
  //           this.forgeUserLoggedIn.next(false);
  //         }
  //       });
  //   }
  // }


  logout() {
    ForgeAuthentificationService.removeForgeAccessToken();
    this.forgeAuthenticatedUser = null;
    this.forgeUserLoggedIn.next(false);
  }
}
