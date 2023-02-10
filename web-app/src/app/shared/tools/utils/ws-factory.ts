import { Observable, Observer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { isEmptyValue, urlJoin, withParams } from '@shared/tools';
import { environment } from '@environments/environment';
import { RequestObject, SearchObject, Sort } from '@shared/models';
import { ResponseObject, ResponsePayload } from '@shared/models/ResponseObject';
import { ToastService } from '@shared/services';
import { Injectable } from '@angular/core';
import { ConstanteWs } from '@shared/constantes/ConstanteWs';
import { map } from 'rxjs/operators';
import { COMMON_NOMENCLATURE_URI } from '@privateLayout/shared/constantes';
import { REQUEST_SPE_CASE } from "@shared/constantes/Constante";


@Injectable({ providedIn: 'root' })
export class WsFactory {


  constructor(
    private http: HttpClient,
    private toast: ToastService
  ) {
  }

  getBase(microservice, server?) {
    // console.assert(!!source, `Error in WsFactory/getUri, erreur: Il faut définir votre microservice`);
    if (isEmptyValue(server)) {
      server = environment.server.hostSource;
    }
    return microservice ? urlJoin(server, microservice) : server;
  }

  getUri(request: RequestObject) {
    console.assert(!isEmptyValue(request.uri), `Error in WsFactory/getUri, erreur: Il faut définir votre uri`);
    let tUri = request.uri;
    if (!isEmptyValue(request.params?.query)) {
      tUri += this.getQueryParamsSubpath(request.params?.query);
    }
    if (!isEmptyValue(request.params?.path)) {
      tUri = this.getPathParamsSubpath(request);
    }
    return tUri;
  }

  getQueryParamsSubpath(queryParams: object) {
    if (queryParams != undefined || queryParams != null) {
      return withParams('', queryParams);
    }
    return '';
  }

  getPathParamsSubpath(request: RequestObject) {
    // if (!pathParams?.length) {
    //   return '';
    // }
    let tUri = request.uri;
    if (Array.isArray(request.params?.path)) {
      console.assert(Array.isArray(request.params?.path), `Error in WsFactory/getPathParamsSubpath, erreur: Il faut que votre pathParams attribut soit un Array`);
      return tUri + (request.params?.path?.length == 0 ? '' : request.params?.path.join('/'));
    }

    if (Object.entries(request.params?.path).length) {
      for (const [key, value] of Object.entries(request.params?.path)) {
        tUri = tUri.replace(':' + key, value.toString());
      }
      return tUri;
    }
    return '';
  }

  callFunction(request: RequestObject): Observable<any> {
    let resource = '';
    switch (request.speCase) {
      case REQUEST_SPE_CASE.UPLOAD:
        resource = urlJoin(this.getBase(request.microservice), this.getUri(request));
        const formData: FormData = new FormData();
        if (!isEmptyValue(request.params?.formData)) {
          for (const [key, value] of Object.entries(request.params?.formData)) {
            if (Array.isArray(value) && value.length != 0) {
              value.forEach(file => {
                if (!isEmptyValue(file) && file.size != 0) {
                  formData.append(key, file);
                }

              });
            } else {
              if (!isEmptyValue(value.size) && value.size != 0) {
                formData.append(key, value);
              } else {
                formData.append(key, JSON.stringify(value));
              }
            }
          }
        }
        if (!isEmptyValue(request.params?.query)) {
          for (const [key, value] of Object.entries(request.params?.query)) {
            if (typeof value == 'object') {
              formData.append(key, JSON.stringify(value));
            } else {
              formData.append(key, value.toString());
            }
          }
        }
        const newRequest = new HttpRequest(request.method, resource, formData, {
          reportProgress: true,
          responseType: 'text'
        });
        return this.http.request(newRequest);
      default:
        resource = urlJoin(this.getBase(request.microservice, request.server), this.getUri(request));
        const getOption = (cond): any => {
          switch (cond) {
            case REQUEST_SPE_CASE.DOWNLOAD:
              return {
                responseType: 'blob'
              };
            case REQUEST_SPE_CASE.DOWNLOAD_PROGRESS:
              return {
                responseType: 'blob',
                observe: 'events',
                reportProgress: true
              };
            default:
              return {};
          }
        };
        console.assert(!!request.method, `Error in WsFactory/getUri, erreur: Il faut définir votre methode`);
        switch (request.method) {
          case ConstanteWs._CODE_GET:
            return this.http.get(resource, { ...getOption(request.speCase) });
          case ConstanteWs._CODE_POST:
            return this.http.post(resource, request.params?.body, { ...getOption(request.speCase) });
          case ConstanteWs._CODE_PUT:
            return this.http.put(resource, request.params?.body, { ...getOption(request.speCase) });
          case ConstanteWs._CODE_DELETE:
            return this.http.delete(resource, request.params?.body);
        }
    }
  }

  callGatewayDateNowPromise() {
    const resource = urlJoin(this.getBase('gateway'), 'dateNow');
    return this.http.get<any>(resource).pipe(map(response => response.payload));
  }

  calListNm(nmType: string, searchObject?: SearchObject, method: 'POST' | 'GET' = 'POST') {
    if (method == ConstanteWs._CODE_POST) {
      // debugger
      searchObject = searchObject || new SearchObject();
      searchObject.sort = searchObject?.sort || new Sort('ordre', 'asc nulls last');
      searchObject.listCol = searchObject?.listCol || ['id', 'code', 'libelleAr', 'libelleFr', 'libelleEn'];
    }
    const request: RequestObject = <RequestObject>{
      uri: COMMON_NOMENCLATURE_URI[nmType],
      params: {
        body: method == ConstanteWs._CODE_POST ? searchObject : null
      },
      microservice: ConstanteWs._CODE_NOMENCLATURE,
      method: method
    };
    return new Promise(resolve => {
      this.callFunction(request).subscribe({
        next: (response: ResponseObject) => {
          if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
            resolve(method == ConstanteWs._CODE_POST ? response.payload.data : response.payload);
          } else {
            console.error(`Error in WsFactory/calListNm, error code :: ${response.code}`);
            this.toast.error();
          }
        },
        error: (error) => {
          console.error(`Error in WsFactory/calListNm, error :: ${error}`);
          this.toast.error();
        }
      });
    });
  }

  commonObserver(responsePayload: object | ResponsePayload, callFctName: string, isLoading: boolean = null): Observer<any> {
    return {
      next: (response: ResponseObject) => {
        if (response.code == '200') {
          responsePayload = response.payload;
          isLoading = false;
          return 'aaa';
        } else {
          isLoading = false;
          console.error(`Error in ${callFctName}, error code :: ${response.code}`);
          this.toast.error();
        }
      },
      error: (error) => {
        isLoading = false;
        console.error(`Error in ${callFctName}, error :: ${error}`);
        this.toast.error();
      },
      complete: () => {
        isLoading = false;
      }
    };
  }
}

