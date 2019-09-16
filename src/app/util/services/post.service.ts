import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { IPost } from '../interfaces/post';
import { IResponseData } from '../interfaces/responseData';
import { IFeed } from '../interfaces/feed';

@Injectable()
export class PostService extends ApiService<IPost> {


    constructor(public __http: HttpClient) {
        super(__http, 'post/');
    }

    getUserPosts(userId: string, load): Promise<IResponseData<IPost[]>> {
        let url = this.url + 'user/' + userId + '/' + load;
        return this.http.get(url).toPromise().then((data: IResponseData<IPost[]>) => { return data; });
    }

    myPosts(load): Promise<IResponseData<IPost[]>> {
        let url = this.url + 'user/me/' + load;
        return this.http.get(url).toPromise().then((data: IResponseData<IPost[]>) => { return data; });
    }

    upVote(postId: string): Promise<IResponseData<null>> {
        let url = this.url + 'upvote/' + postId;
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    report(item): Promise<IResponseData<null>> {
        let urlExt = 'report/';
        return this.http.post(this.url + urlExt, item).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    downVote(postId: string): Promise<IResponseData<null>> {
        let url = this.url + 'downvote/' + postId;
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    unVote(postId: string): Promise<IResponseData<null>> {
        let url = this.url + 'unvote/' + postId;
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    getTagPosts(tag: string, load): Promise<IResponseData<null>> {
        let url = this.url + 'tag/' + tag + '/' + load;
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    getPersonalFeed(load): Promise<IResponseData<IFeed>> {
        let url = this.url + 'feed/' + load;
        return this.http.get(url).toPromise().then((data: IResponseData<IFeed>) => { return data; });
    }
}