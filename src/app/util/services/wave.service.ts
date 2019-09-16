import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { IWave } from '../interfaces/wave';
import { IResponseData } from '../interfaces/responseData';


@Injectable()
export class WaveService extends ApiService<IWave> {

    constructor(public __http: HttpClient) {
        super(__http, 'wave/');
    }

    getUserWaves(userId: string): Promise<IResponseData<IWave[]>> {
        let url = this.url + 'user/' + userId;
        return this.http.get(url).toPromise().then((data: IResponseData<IWave[]>) => { return data; });
    }

    getWave(waveId): Promise<IResponseData<IWave>>  {
        let url = this.url + 'find/' + waveId;
        return this.http.get(url).toPromise().then((data: IResponseData<IWave>) => { return data; });
    }

    addItem(waveId, item): Promise<IResponseData<null>> {
        let url = this.url + waveId + '/addItem';
        return this.http.post(url, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    deleteItem(waveId, itemId): Promise<IResponseData<null>>  {
        let url = this.url + waveId + '/removeItem/' + itemId;
        return this.http.delete(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }
}