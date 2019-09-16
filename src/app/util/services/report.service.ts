import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { IResponseData } from '../interfaces/responseData';


@Injectable()
export class ReportService extends ApiService<Object> {
    constructor(public __http: HttpClient) {
        super(__http, 'report/');
    }

    report(item): Promise<IResponseData<null>> {
        let urlExt = 'report/';
        return this.http.post(this.url + urlExt, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }
}