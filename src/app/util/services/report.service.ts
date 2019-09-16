import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { IResponseData } from '../interfaces/responseData';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ReportService extends ApiService<Object> {
    constructor(public __http: Http) {
        super(__http, 'report/');
    }

    report(item): Promise<IResponseData<null>> {
        let urlExt = 'report/';
        return this.http.post(this.url + urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
    }
}