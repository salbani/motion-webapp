import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { IResponseData } from '../interfaces/responseData';
import { IMedia } from '../interfaces/media';

@Injectable()
export class MediaService extends ApiService<string>{

    constructor(public __http: Http) {
        super(__http, 'media/');
    }
    mediaUpload(img): Promise<IResponseData<null> & { name: string, path: string, status: string }> {
        let urlExt = this.url + 'upload';
        return this.http.post(urlExt, img).map(res => res.json()).toPromise().then(data => { return data; });
    }

    getMyImages(id): Promise<IResponseData<IMedia[]>> {
        let url = this.url + 'user/' + id;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }
}


