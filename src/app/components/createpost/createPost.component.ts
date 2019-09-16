import { Component, OnDestroy, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { PostService } from '../../util/services/post.service';
import { UserService } from '../../util/services/user.service';
import { IPost } from '../../util/interfaces/post';
import { config } from '../../constants/config';

@Component({
  selector: 'createpost',
  templateUrl: './createPost.component.html',
  styleUrls: ['./createPost.component.css'],
})
export class CreatePostComponent implements OnInit, OnDestroy {

  isPostUploaded = false;
  required: string;
  editPostId: string;
  hasBeenEdited = false;
  interval: number;
  inCaseSummary: string;
  post: IPost = {
    title: '',
    content: '',
    tags: [],
    summary: ''
  };
  isUpdated = new EventEmitter<string>();
  published = new EventEmitter<string>();

  constructor(private _languageService: LanguageService, private _postService: PostService, private _router: Router, private _route: ActivatedRoute, private _userService: UserService) { }

  async ngOnInit() {
    if (!this._userService.isLoggedIn)
      this._router.navigate(['login']);

    this._route.params.subscribe(params => { this.editPostId = params['id']; });


    if (this.editPostId) {
      this.isPostUploaded = true;
      let getPostRes = await this._postService.find(this.editPostId);
      this.post = getPostRes.data;
    }
    else {
      let storage = JSON.parse(localStorage.getItem('post'));
      this.post = storage ? storage : this.post;
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    if (!this._userService.isLoggedIn)
      if (this.hasBeenEdited) {
        localStorage.setItem('post', JSON.stringify(this.post));
        this.create(this.post);
      }
  }

  addPicture(img) {
    this.post.photo = img;
  }

  change(content) {
    this.post.content = JSON.stringify(content.content);
    this.inCaseSummary = content.text;
    this.hasBeenEdited = true;
    localStorage.setItem('post', JSON.stringify(this.post));
    clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      this.create(this.post);
      clearInterval(this.interval);
    }, 60000);
  }

  async upload() {
    clearInterval(this.interval);
    let success = await this.create(this.post);
    if (success)
      this._router.navigate(['profile']);
  }

  async create(create: IPost) {
    if (!(create.title === '' || create.content === '')) {
      if (create.summary === '')
        create.summary = this.inCaseSummary;
      if (!this.isPostUploaded) {
        let createPostRes = await this._postService.create(create);
        this.editPostId = createPostRes.data._id;
        if (!createPostRes)
          return false;
        this.published.emit('toast');
        localStorage.removeItem('post');
        this.hasBeenEdited = false;
        this.isPostUploaded = true;
        return true;

      }
      else {
        let updatePostRes = await this._postService.update(create, this.editPostId).catch(err => {
          return false;
        });
        if (!updatePostRes)
          return false;
        this.isUpdated.emit('toast');
        localStorage.removeItem('post');
        this.hasBeenEdited = false;
        return true;
      }
    }
    else
      this.required = '';
  }

}
