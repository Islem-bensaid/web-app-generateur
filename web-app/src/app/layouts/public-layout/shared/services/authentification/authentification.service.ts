import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToastService} from '@shared/services/toast/toast.service';
import {RequestObject} from '@shared/models';
import {AuthentificationUri} from '@publicLayout/shared/constantes';
import {ConstanteWs} from '@shared/constantes/ConstanteWs';
import {ResponseObject} from '@shared/models/ResponseObject';
import {SharedService} from '@shared/services/sharedWs/shared.service';
import {Router} from '@angular/router';
import { isEmptyValue } from '@app/shared/tools';
import { PUL_OTHER_CODES } from '@publicLayout/shared/constantes/common/Constante';

@Injectable({
    providedIn: 'root'
})
export class AuthentificationService {

    private _CODE_TOKEN_KEY = PUL_OTHER_CODES.APP_TOKEN_KEY;

    userLoggedIn = new Subject<boolean>();
    authenticatedUser: any;

    constructor(
        private http: HttpClient,
        private toast: ToastService,
        private sharedService: SharedService,
        private router: Router
    ) {
    }

    setUserLoggedIn(flag) {
        this.userLoggedIn.next(flag);
    }

    getUserLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
    }

    private removeAccessToken() {
        sessionStorage.removeItem(this._CODE_TOKEN_KEY);
    }

    private saveAccessToken(accessToken: any) {
        sessionStorage.setItem(this._CODE_TOKEN_KEY, accessToken);
    }

    private getAccessToken() {
        return sessionStorage.getItem(this._CODE_TOKEN_KEY);
    }


    public authenticate(credentials): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            this.removeAccessToken();
            const request: RequestObject = <RequestObject>{
                uri: AuthentificationUri.LOGIN.AUTHENTIFICATE,
                params: {
                    body: credentials
                },
                microservice: ConstanteWs._CODE_GATEWAY,
                method: ConstanteWs._CODE_POST
            };
            this.sharedService.commonWs(request).subscribe({
                next: (response: ResponseObject) => {
                    if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                        this.saveAccessToken(response.payload['token']);
                        this.isUserAuthentificated().subscribe(isAuthentificated => {
                            if (isAuthentificated) {
                                subscriber.next(true);
                            } else {
                                console.error(`Error in AuthentificationService/authentificate, error :: isAuthentificated = false`);
                                this.toast.error();
                                subscriber.next(false);
                            }
                        });
                    } else if (response.code == ConstanteWs._CODE_WS_USER_ERROR_AUTH) {
                        this.toast.error('athentification.login.errors.userErrorAuth');
                        subscriber.next(false);
                    } else if (response.code == ConstanteWs._CODE_WS_SUCCESS_WAIT_PERMISSION) {
                        this.toast.error('athentification.login.errors.userErrorAuthInvalid');
                        subscriber.next(false);
                    } else {
                        console.error(`Error in AuthentificationService/authentificate, error code :: ${response.code}`);
                        this.toast.error();
                        subscriber.next(false);
                    }
                },
                error: (error) => {
                    console.error(`Error in AuthentificationService/authentificate, error :: ${error}`);
                    this.toast.error();
                    subscriber.next(false);
                }
            });
        });
    }


    public fetchWhoAmI(): Observable<any> {
        return new Observable<any>((subscriber) => {
            if (!isEmptyValue(this.getAccessToken())) {
                const request: RequestObject = <RequestObject>{
                    uri: AuthentificationUri.LOGIN.WHOIAM,
                    microservice: ConstanteWs._CODE_GATEWAY,
                    method: ConstanteWs._CODE_GET
                };
                this.sharedService.commonWs(request).subscribe({
                    next: (response: ResponseObject) => {
                        if (response.code == ConstanteWs._CODE_WS_SUCCESS) {
                            this.authenticatedUser = response.payload;
                            this.userLoggedIn.next(true);
                            subscriber.next(response);
                        } else {
                            console.error(`Error in AuthentificationService/fetchWhoAmI, error code :: ${response.code}`);
                            this.toast.error();
                            subscriber.next(false);
                        }
                    },
                    error: (error) => {
                        console.error(`Error in AuthentificationService/fetchWhoAmI, error :: ${error}`);
                        this.toast.error();
                        subscriber.next(false);
                    }
                });
            } else {
                subscriber.next(false);
            }
        });
    }

    public isUserAuthentificated(): Observable<boolean> {
        return new Observable<boolean>((subscriber) => {
            if (!!this.authenticatedUser) {
                subscriber.next(true);
                this.userLoggedIn.next(true);
            } else {
                this.fetchWhoAmI().subscribe({
                    next: (response) => {
                        if (response) {
                            this.userLoggedIn.next(true);
                            subscriber.next(true);
                        } else {
                            this.userLoggedIn.next(false);
                            subscriber.next(false);
                        }
                    },
                    error: () => {
                        this.userLoggedIn.next(false);
                        subscriber.next(false);
                    }
                });
            }
        });
    }

    public logout(): void {
        this.removeAccessToken();
        this.authenticatedUser = false;
        this.userLoggedIn.next(false);
        this.router.navigate(['/']);
    }
}
