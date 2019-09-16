import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api.service';
import { IPost } from '../interfaces/post';
import { IResponseData } from '../interfaces/responseData';
import { IFeed } from '../interfaces/feed';

@Injectable()
export class PostService extends ApiService<IPost> {


    constructor(public __http: Http) {
        super(__http, 'post/');
    }

    getUserPosts(userId: string, load): Promise<IResponseData<IPost[]>> {
        let url = this.url + 'user/' + userId + '/' + load;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    myPosts(load): Promise<IResponseData<IPost[]>> {
        let url = this.url + 'user/me/' + load;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    upVote(postId: string): Promise<IResponseData<null>> {
        let url = this.url + 'upvote/' + postId;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    report(item): Promise<IResponseData<null>> {
        let urlExt = 'report/';
        return this.http.post(this.url + urlExt, item).map(res => res.json()).toPromise().then(data => { return data; });
    }

    downVote(postId: string): Promise<IResponseData<null>> {
        let url = this.url + 'downvote/' + postId;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    unVote(postId: string): Promise<IResponseData<null>> {
        let url = this.url + 'unvote/' + postId;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    getTagPosts(tag: string, load): Promise<IResponseData<null>> {
        let url = this.url + 'tag/' + tag + '/' + load;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }

    getPersonalFeed(load): Promise<IResponseData<IFeed>> {
        let url = this.url + 'feed/' + load;
        return this.http.get(url).map(res => res.json()).toPromise().then(data => { return data; });
    }
}