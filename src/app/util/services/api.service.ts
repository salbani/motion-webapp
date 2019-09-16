import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { IResponseData } from '../interfaces/responseData';
import { config } from '../../constants/config';

@Injectable()
export class ApiService<T> {

    private baseUrl: string = config.API_URL + '/';
    __http: HttpClient;
    url: string;
    http: HttpHeader;

    constructor(__http: HttpClient, urlExt: string) {
        this.__http = __http;
        this.url = this.baseUrl + urlExt;
        this.http = new HttpHeader(__http);
    }

    index(page): Promise<IResponseData<T[]>> {
        let urlExt = this.url + page;
        return this.http.get(urlExt).toPromise().then((data: IResponseData<T[]>) => { return data; });
    }

    create(item: T): Promise<IResponseData<T>> {
        let urlExt = this.url + 'create';
        return this.http.post(urlExt, item).toPromise().then((data: IResponseData<T>) => {
            return this.checkResponse(data);
        });
    }

    find(id: string): Promise<IResponseData<T>> {
        let urlExt = this.url + 'find/' + id;
        return this.http.get(urlExt).toPromise().then((data: IResponseData<T>) => { return data; });
    }

    delete(id: string): Promise<IResponseData<T>> {
        return this.http.delete(this.url + id).toPromise().then((data: IResponseData<T>) => { return data; });
    }

    update(item: Partial<T>, id: string): Promise<IResponseData<T>> {
        let urlExt = this.url + 'update/' + id;
        return this.http.put(urlExt, item).toPromise().then((data: IResponseData<T>) => { return data; });
    }
    checkResponse(response) {
        /*if (response.type === 1100)
            this._router.navigate(['error', 'Token Abgelaufen bitte neu éinloggen']);
        else*/
            return response;
    }
}

export class HttpHeader {
    http: HttpClient;
    constructor(http: HttpClient) {
        this.http = http;
    }

    createAuthorizationHeader() {
        let headers = new HttpHeaders();
        if (ThisUser.loginToken) {
            return headers.append('Authorization', ' Bearer ' + ThisUser.loginToken);
        }
        return headers;
    }

    get(url: string) {
        const headers = this.createAuthorizationHeader();
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: Object) {
        const headers = this.createAuthorizationHeader();
        console.log(headers)
        return this.http.post(url, data, {
            headers: headers
        });
    }
    put(url: string, data: Object) {
        const headers = this.createAuthorizationHeader();
        return this.http.put(url, data, {
            headers: headers
        });
    }
    delete(url: string) {
        const headers = this.createAuthorizationHeader();
        return this.http.delete(url, {
            headers: headers
        });
    }
}

export class ThisUser {
    static user: IUser;
    static loginToken: string = null;
}