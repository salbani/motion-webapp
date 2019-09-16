import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { PostService } from '../../util/services/post.service';
import { UserService } from '../../util/services/user.service';
import { IPost } from '../../util/interfaces/post';

@Component({
	selector: 'feed',
	templateUrl: './feed.component.html',
})

export class FeedComponent implements OnInit {

	posts: IPost[];
	load = 0;
	scroll = 0;
	isLogged = false;

	constructor(private userService: UserService, private _languageService: LanguageService, private _postService: PostService, private _router: Router) { }

	async ngOnInit() {
		if (this.userService.isLoggedIn)
			this.posts = await this.getPersonalFeed();
		else
			this.posts = await this.getFeed();
	}

	async loadMore() {
		this.scroll++;

		if (this.scroll >= 3) {
			let posts: IPost[];
			this.load++;
			if (this.userService.isLoggedIn)
				posts = await this.getPersonalFeed();
			else
				posts = await this.getFeed();
			for (let post of posts) {
				this.posts.push(post);
			}
			this.scroll = 0;
		}
	}
	async getPersonalFeed() {
		let posts: IPost[] = [];
		let getPersonalFeedRes = await this._postService.getPersonalFeed(this.load);
		if (getPersonalFeedRes.type === 1000) {
			for (let post of getPersonalFeedRes.data.posts) {
				posts.push(post.post);
			}
		}
		return posts;
	}

	async getFeed() {
		let getFeedRes = await this._postService.index(this.load);
		if (getFeedRes.type === 1000)
			return getFeedRes.data;
	}
}
