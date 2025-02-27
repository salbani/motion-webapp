import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { IComment } from '../interfaces/Comment';
import { IResponseData } from '../interfaces/responseData';

@Injectable()
export class CommentService extends ApiService<IComment> {

    constructor(public __http: HttpClient) {
        super(__http, 'comment/');
    }

    upVote(commentId: string): Promise<IResponseData<null>> {
        let url = this.url + commentId + '/upvote';
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    downVote(commentId: string): Promise<IResponseData<null>> {
        let url = this.url + commentId + '/downvote';
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    unVote(commentId: string): Promise<IResponseData<null>> {
        let url = this.url + commentId + '/unvote';
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }
    commentupVote(commentId: string, relatedId: string): Promise<IResponseData<null>> {
        let url = this.url + relatedId + '/comment/' + commentId + '/upvote';
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    commentdownVote(commentId: string, relatedId: string): Promise<IResponseData<null>> {
        let url = this.url + relatedId + '/comment/' + commentId + '/downvote';
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }

    commentunVote(commentId: string, relatedId: string): Promise<IResponseData<null>> {
        let url = this.url + relatedId + '/comment/' + commentId + '/unvote';
        return this.http.get(url).toPromise().then((data: IResponseData<null>) => { return data; });
    }
    addCommentPost(postId: string, content: {content: String}): Promise<IResponseData<IComment>> {
        let urlExt = 'post/' + postId;
        return this.http.post(this.url + urlExt,  content ).toPromise().then((data: IResponseData<IComment>) => { return data; });
    }

    addCommentComment(commentId: string, content: {content: String}): Promise<IResponseData<IComment>> {
        let urlExt = 'comment/' + commentId;
        return this.http.post(this.url + urlExt,  content ).toPromise().then((data: IResponseData<IComment>) => { return data; });
    }
    getComments(commentId: string): Promise<IResponseData<IComment[]>> {
        let urlExt = 'post/' + commentId;
        return this.http.get(this.url + urlExt).toPromise().then((data: IResponseData<IComment[]>) => { return data; });
    }
}