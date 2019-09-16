import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { IUser } from '../interfaces/user';
import { IResponseData } from '../interfaces/responseData';
import { config } from '../../constants/config';

@Injectable()
export class ApiService<T> {

    private baseUrl: string = config.API_URL + '/';
    __http: Http;
    url: string;
    http: HttpHeader;

    constructor(__http: Http, urlExt: string/*, private _router: Router*/) {
        this.__http = __http;
        this.url = this.baseUrl + urlExt;
        this.http = new HttpHeader(__http);
    }

    index(page): Promise<IResponseData<T[]>> {
        let urlExt = this.url + page;
        return this.http.get(urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }

    create(item: T): Promise<IResponseData<T>> {
        let urlExt = this.url + 'create';
        return this.http.post(urlExt, item).map(res => res.json()).toPromise().then(data => {
            return this.checkResponse(data);
        });
    }

    find(id: string): Promise<IResponseData<T>> {
        let urlExt = this.url + 'find/' + id;
        return this.http.get(urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }

    delete(id: string): Promise<IResponseData<T>> {
        return this.http.delete(this.url + id).map(res => res.json()).toPromise().then(data => { return data; });
    }

    update(item: T, id: string): Promise<IResponseData<T>> {
        let urlExt = this.url + 'update/' + id;
        return this.http.put(urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
    }
    checkResponse(response) {
        /*if (response.type === 1100)
            this._router.navigate(['error', 'Token Abgelaufen bitte neu éinloggen']);
        else*/
            return response;
    }
}

export class HttpHeader {
    http: Http;
    constructor(http: Http) {
        this.http = http;
    }

    createAuthorizationHeader(headers: Headers) {
        if (ThisUser.loginToken)
            headers.append('Authorization', ' Bearer ' + ThisUser.loginToken);
    }

    get(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: Object) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }
    put(url: string, data: Object) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }
    delete(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }
}

export class ThisUser {
    static user: IUser;
    static loginToken: string = null;
}