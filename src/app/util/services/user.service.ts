import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService, ThisUser } from './api.service';
import { md5 } from './md5.service';
import { IUser } from '../interfaces/user';
import { IResponseData } from '../interfaces/responseData';
import { ICreadentials } from '../interfaces/Credentials';


@Injectable()
export class UserService extends ApiService<IUser> {

    public get user(): IUser {
        return ThisUser.user;
    }

    public get token(): string {
        return ThisUser.loginToken;
    }

    public get isLoggedIn(): boolean {
        if (ThisUser.loginToken)
            return true;
        else
            return false;
    }

    constructor(public __http: HttpClient) {
        super(__http, 'user/');
    }

    async init(token?: string) {
        if (this.setToken(token)) {
            let me = await this.me();
            if (me.type === 1000) {
                ThisUser.user = me.data;
                return true;
            } else
                this.clearToken();
        }
        return false;
    }

    private clearToken() {
        localStorage.removeItem('loginToken');
        ThisUser.user = null;
        ThisUser.loginToken = null;
    }

    private setToken(token?: string): boolean {
        if (token) {
            ThisUser.loginToken = token;
            localStorage.setItem('loginToken', token);
            return true;
        } else {
            let __token = localStorage.getItem('loginToken');
            if (__token) {
                ThisUser.loginToken = __token;
                return true;
            }
        }
        return false;
    }

    private me(): Promise<IResponseData<IUser>> {
        let urlExt = 'me/';
        return this.http.get(this.url + urlExt).toPromise().then((data: IResponseData<IUser>) => { return data; });
    }

    create(item: ICreadentials | IUser): Promise<IResponseData<null>> {
        let urlExt = 'signup';
        return this.http.post(this.url + urlExt, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    login(item: ICreadentials): Promise<IResponseData<{ token: string }>> {
        let urlExt = 'login';
        return this.http.post(this.url + urlExt, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    logout() {
        this.clearToken();
    }

    bookmark(postId: string): Promise<IResponseData<null>> {
        let urlExt = 'bookmark/' + postId;
        return this.http.get(this.url + urlExt).toPromise().then((data: IResponseData<null>) => { return data; });
    }
    unBookmark(postId: string): Promise<IResponseData<null>> {
        let urlExt = 'unbookmark/' + postId;
        return this.http.get(this.url + urlExt).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    connect(id: string): Promise<IResponseData<null>> {
        let urlExt = 'follow/' + id;
        return this.http.get(this.url + urlExt).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    disconnect(id: string): Promise<IResponseData<null>> {
        let urlExt = 'unfollow/' + id;
        return this.http.get(this.url + urlExt).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    changePassword(item): Promise<IResponseData<null>> {
        let urlExt = 'changePassword/';
        return this.http.post(this.url + urlExt, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    newPassword(item): Promise<IResponseData<null>> {
        let urlExt = 'resetpassword';
        return this.http.post(this.url + urlExt, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    isUsersId(id: string) {
        if (!ThisUser.user._id) return null;
        if (ThisUser.user._id === id) return true;
        else return false;
    }

    async getUserAvatar(user: IUser): Promise<string> {
        let userInfo = user.local ? user.local : user.google ? user.google : user.facebook ? user.facebook : user.twitter ? user.twitter : user.wordpress;
        let urlExt = 'https://www.gravatar.com/avatar/' + md5(userInfo.email) + '?d=mm';
        let avatar = user.avatar ? user.avatar : await this.__http.get(urlExt).toPromise().then(data => {
            return urlExt;
        }, err => {
            return 'http://www.photographersadventureclub.com/wp-content/uploads/2013/02/blank-avatar.png';
        });
        return avatar;
    }
}