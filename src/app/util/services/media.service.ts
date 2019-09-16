import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { IResponseData } from '../interfaces/responseData';
import { IMedia } from '../interfaces/media';

@Injectable()
export class MediaService extends ApiService<string>{

    constructor(public __http: HttpClient) {
        super(__http, 'media/');
    }
    mediaUpload(img): Promise<MediaUploadResult> {
        let urlExt = this.url + 'upload';
        return this.http.post(urlExt, img).toPromise().then((data: Promise<MediaUploadResult>) => { return data; });
    }

    getMyImages(id): Promise<IResponseData<IMedia[]>> {
        let url = this.url + 'user/' + id;
        return this.http.get(url).toPromise().then((data: IResponseData<IMedia[]>) => { return data; });
    }
}

export type MediaUploadResult = IResponseData<null> & { name: string, path: string, status: string }

