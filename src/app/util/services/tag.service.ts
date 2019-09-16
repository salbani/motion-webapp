import { Injectable } from '@angular/core'; 
import { Http } from '@angular/http'; 
import { ApiService } from './api.service'; 
import 'rxjs/add/operator/toPromise'; 
import { ITag } from '../interfaces/tag';
import { IResponseData } from '../interfaces/responseData';
 
 
@Injectable() 
export class TagService extends ApiService<ITag> { 
    constructor(public __http: Http) { 
        super(__http, 'tag/'); 
    } 
 
    getTags(): Promise<IResponseData<ITag[]>> { 
        let url = this.url + 'tags/'; 
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; }); 
    } 
}