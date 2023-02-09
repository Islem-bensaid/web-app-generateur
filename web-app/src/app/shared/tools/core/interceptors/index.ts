import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppHttpInterceptor} from './http/app-http-interceptor';

const HttpInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true,
};

export const Interceptors = [HttpInterceptor];
