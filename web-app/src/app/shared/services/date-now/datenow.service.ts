import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { urlJoin } from '../../tools';
import { environment } from '../../../../environments/environment';
import { WsFactory } from '@shared/tools/utils/ws-factory';

@Injectable({
    providedIn: 'root',
})
export class DatenowService {


    constructor(private http: HttpClient, private wsFactory : WsFactory) {
    }

    get callGatewayDateNow() {
        const resource = urlJoin(this.wsFactory.getBase('gateway'), 'dateNow');
        return this.http
            .get<any>(resource)
            .pipe(map((response) => response.payload));
    }


}
