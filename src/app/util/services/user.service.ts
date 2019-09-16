import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService, ThisUser } from './api.service';
import { md5 } from './md5.service';
import { IUser } from '../interfaces/user';
import { IResponseData } from '../interfaces/responseData';
import 'rxjs/add/operator/toPromise';


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

    constructor(public __http: Http) {
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
        return this.http.get(this.url + urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }

    create(item: IUser): Promise<IResponseData<null>> {
        let urlExt = 'signup';
        return this.http.post(this.url + urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
    }

    login(item: IUser): Promise<IResponseData<{ token: string }>> {
        let urlExt = 'login';
        return this.http.post(this.url + urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
    }

    logout() {
        this.clearToken();
    }

    bookmark(postId: string): Promise<IResponseData<null>> {
        let urlExt = 'bookmark/' + postId;
        return this.http.get(this.url + urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }
    unBookmark(postId: string): Promise<IResponseData<null>> {
        let urlExt = 'unbookmark/' + postId;
        return this.http.get(this.url + urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }

    connect(id: string): Promise<IResponseData<null>> {
        let urlExt = 'follow/' + id;
        return this.http.get(this.url + urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }

    disconnect(id: string): Promise<IResponseData<null>> {
        let urlExt = 'unfollow/' + id;
        return this.http.get(this.url + urlExt).map(res => res.json()).toPromise().then(data => { return data; });
    }

    changePassword(item): Promise<IResponseData<null>> {
        let urlExt = 'changePassword/';
        return this.http.post(this.url + urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
    }

    newPassword(item): Promise<IResponseData<null>> {
        let urlExt = 'resetpassword';
        return this.http.post(this.url + urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
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