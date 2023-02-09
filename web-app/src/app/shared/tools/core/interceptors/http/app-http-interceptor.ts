import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { LoadingService } from '@shared/services';
import { isEmptyValue, isObject } from '@shared/tools';
import * as Links from '../../../../constantes/links';
import { environment } from '@environments/environment';
import { PUL_OTHER_CODES } from '@publicLayout/shared/constantes/common/Constante';
import { PRL_OTHER_CODES } from '@privateLayout/shared/constantes/common/Constantes';


/**
 * @Author Sofiene Gharbi
 */


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(
    private loading: LoadingService
  ) {
  }

  static _executeBadResponseMiddleware(response: any) {
    if (
      AppHttpInterceptor._isServerResponse(response) &&
      response?.body?.code !== '200'
    ) {
      const errorMessage = response?.body;
      return throwError(errorMessage);
    }

    return of(response);
  }

  static _isServerResponse(response: any): boolean {
    if (!(response instanceof HttpResponse)) {
      return false;
    }

    if (!response.hasOwnProperty('body')) {
      return false;
    }
    if (!isObject(response.body)) {
      return false;
    }

    return (
      Object.keys(response.body).includes('code') &&
      Object.keys(response.body).includes('message')
    );
  }

  getHeader(req: HttpRequest<any>, accessToken: string) {
    return req.clone({
      setHeaders: {
        Authorization: ['Bearer', accessToken].join(' ')
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem(this._isForgeApi(req) ? PRL_OTHER_CODES.FORGE_TOKEN_KEY : PUL_OTHER_CODES.APP_TOKEN_KEY);

    if (!isEmptyValue(accessToken)) {
      req = this.getHeader(req, accessToken);
    }


    // with loader
    if (!this._isExludedInterUrl(req)) {
      // this.loading.setLoading(true, req.url);
        this.loading.setLoading(true, req.url,req.reportProgress);
    }
    return next
      .handle(req)
      .pipe(
        catchError((err) => {
          this.loading.setLoading(false, req.url);
          return err;
        })
      )
      .pipe(
        map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.loading.setLoading(false, req.url);
          }
          return evt;
        }),
        mergeMap((response: any) => {
          // this.loading.setLoading(false, req.url);
          return AppHttpInterceptor._executeBadResponseMiddleware(response);
        })
      );
  }

  private _isExludedInterUrl(req) {
    return Links.exludedInterUrlList.some(url => (req.url.includes(url)));
  }

  private _isForgeApi(req) {
    return req.url.includes(environment.forgeProperties.hostSource);
  }


}
