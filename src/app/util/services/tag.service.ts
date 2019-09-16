import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service'; 
import { ITag } from '../interfaces/tag';
import { IResponseData } from '../interfaces/responseData';
 
 
@Injectable() 
export class TagService extends ApiService<ITag> { 
    constructor(public __http: HttpClient) { 
        super(__http, 'tag/'); 
    } 
 
    getTags(): Promise<IResponseData<ITag[]>> { 
        let url = this.url + 'tags/'; 
        return this.http.get(url).toPromise().then((data: IResponseData<ITag[]>) => { return data; }); 
    } 
}