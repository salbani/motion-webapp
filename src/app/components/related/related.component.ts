import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../util/interfaces/user';
import { IPost } from '../../util/interfaces/post';
import { PostService } from '../../util/services/post.service';
import { LanguageService } from '../../util/services/language.service';

@Component({
    selector: 'related',
    templateUrl: './related.component.html'
})

export class RelatedComponent implements OnInit, OnChanges {

    @Input() user: IUser;
    @Input() relatedFromId;
    postid: string;
    posts: IPost[];
    load = 0;
    noRelated = false;

    constructor(private _postService: PostService, private _router: Router, private _languageService: LanguageService) { }

    async ngOnChanges() {
        if (this.postid !== this.relatedFromId) {
            this.postid = this.relatedFromId;
            let getPostsRes = await this._postService.getUserPosts(this.user._id, this.load)
            if (getPostsRes.data.length > 1) {
                if (getPostsRes.type === 1000) {
                    this.posts = getPostsRes.data;
                    this.split(this.posts);
                    window.scrollTo(0, 0);
                }
            }
            else
                window.scrollTo(0, 0);
        }
    }

    async ngOnInit() {
        this.postid = this.relatedFromId;
        let posts = await this._postService.getUserPosts(this.user._id, this.load);
        if (posts.data.length > 1) {
            if (posts.type === 1000) {
                this.posts = posts.data;
                this.split(this.posts);
            }
        }
        else
            this.noRelated = true;
    }

    split(posts) {
        for (let i = posts.length - 1; i >= 0; i--) {
            if (posts[i]._id === this.relatedFromId) {
                posts.splice(i, 1);
                this.posts = posts;
            }
        }
    }
}