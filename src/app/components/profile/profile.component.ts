import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPost } from '../../util/interfaces/post';
import { IUser } from '../../util/interfaces/user';
import { LanguageService } from '../../util/services/language.service';
import { PostService } from '../../util/services/post.service';
import { UserService } from '../../util/services/user.service';
import { NavbarService } from '../../util/services/navbar.service';

@Component({
	selector: 'profile',
	templateUrl: '../profile/profile.component.html',
	styleUrls: ['../profile/profile.component.css']
})

export class ProfileComponent implements OnInit, OnDestroy {

	posts: IPost[];
	backGroundImg: string;
	user: IUser;
	isUserMe;
	load = 0;
	scroll = 0;
	noResurce = false;

	constructor(private _navbarService: NavbarService, private _languageService: LanguageService, private _postService: PostService, private _userService: UserService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

	async ngOnInit() {
		let paramUserId: string;
		this._activatedRoute.params.subscribe(params => { paramUserId = params['id'] });
		// await this._activatedRoute.params.toPromise().then(params => { paramUserId = params['id'] });

		if (paramUserId) {
			let findUserRes = await this._userService.find(paramUserId).catch(err => { this._router.navigate(['err']); return null; });
			if (findUserRes.type === 1000) {
				this.user = findUserRes.data;
				this.isUserMe = this._userService.isUsersId((paramUserId));
				await this.afterInit(paramUserId);
			} else this._router.navigate(['err']);
		} else {
			if (!this._userService.isLoggedIn) {
				this._router.navigate(['login']);
			} else {
				this.user = this._userService.user;
				this.isUserMe = true;
				await this.afterInit(this.user._id);
			}
		}
	}

	ngOnDestroy() {
		this._navbarService.setCurrentPage(null, null);
	}

	async deletePost(post) {
		let index = this.posts.indexOf(post);
		let data = await this._postService.delete(post._id).catch(err => { this._router.navigate(['err']); return null; });
		if (data.type === 1000)
			this.posts.splice(index, 1);
		//TODO error
	}

	async	afterInit(paramUserId) {
		this._navbarService.setCurrentPage('profile', this.user);
		this.backGroundImg = this.user.landscape ? this.user.landscape : 'img/bg/bg4.jpg';
		let post = await this._postService.getUserPosts(paramUserId, this.load).catch(err => { this._router.navigate(['err']); return null; });
		if (post.type === 1000)
			this.posts = post.data;
		else if (post.type === 1104)
			this.noResurce = true;
	}

	async loadMore() {
		this.scroll++;
		if (this.scroll === 3) {
			this.load++;
			let posts = await this._postService.getUserPosts(this.user._id, this.load);
			if (posts.type === 1000)
				for (let post of posts.data) {
					this.posts.push(post);
				}
			this.scroll = 0;
		}
	}

}
