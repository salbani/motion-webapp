import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { IWave } from '../interfaces/wave';
import 'rxjs/add/operator/toPromise';
import { IResponseData } from '../interfaces/responseData';


@Injectable()
export class WaveService extends ApiService<IWave> {

    constructor(public __http: Http) {
        super(__http, 'wave/');
    }

    getUserWaves(userId: string): Promise<IResponseData<IWave[]>> {
        let url = this.url + 'user/' + userId;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    getWave(waveId): Promise<IResponseData<IWave>>  {
        let url = this.url + 'find/' + waveId;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    addItem(waveId, item): Promise<IResponseData<null>> {
        let url = this.url + waveId + '/addItem';
        return this.http.post(url, item).map(res => res.json()).toPromise().then(data => { return data; });
    }

    deleteItem(waveId, itemId): Promise<IResponseData<null>>  {
        let url = this.url + waveId + '/removeItem/' + itemId;
        return this.http.delete(url).map(res => res.json()).toPromise().then(data => { return data; });
    }
}