import { Voted } from '../voting/voting.component';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IPost } from '../../util/interfaces/post';
import { LanguageService } from '../../util/services/language.service';
import { PostService } from '../../util/services/post.service';
import { UserService } from '../../util/services/user.service';
import { CommentService } from '../../util/services/comment.service';
import { NavbarService } from '../../util/services/navbar.service';
import { IComment } from '../../util/interfaces/Comment';
import * as Quill from 'quill';

@Component({
    selector: 'post',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit, OnDestroy {

    @ViewChild('container', { static: true }) QuillContainer: ElementRef;
    post: IPost = {
        title: '',
        content: '',
        tags: [],
        summary: ''
    };
    isMyPost = false;
    comments: IComment[];
    id: string;
    init = false;
    myVote: Voted;
    date;
    delNeedsConfirm = false;
    isPostOlderThanOneDay = true;
    newComment: string;
    quill: Quill.Quill;
    url: string;

    constructor(private _userService: UserService, private _languageService: LanguageService, private _postService: PostService, private _commentService: CommentService, private _router: Router, private _aktivatedRoute: ActivatedRoute, private _navbarService: NavbarService) { }

    async ngOnInit() {
        var options = {
            modules: {
                toolbar: false
            },
            readOnly: true,
            theme: 'snow'
        };

        this.quill = new Quill(this.QuillContainer.nativeElement, options)

        this._aktivatedRoute.params.subscribe(async params => {
            this.id = params['id'];
            let data = await this._postService.find(this.id);
            this.post = data.data;
            this.init = true;
            this.quill.setContents(JSON.parse(this.post.content));
            this.setDateStyle();
            this._navbarService.setCurrentPage('article', this.post.user);
            this.getComments();
        }, err => {
            this._router.navigate(['err']);
        });
        this.url = window.location.href;
    }

    async  getComments() {
        let getCommentsRes = await this._commentService.getComments(this.id);
        if (getCommentsRes.type === 1000)
            this.comments = getCommentsRes.data;
        if (this._userService.isLoggedIn) {
            this.myVote = (this.post.downvoted.indexOf(this._userService.user._id) >= 0) ? Voted.downVoted : (this.post.upvoted.indexOf(this._userService.user._id) >= 0) ? Voted.upVoted : Voted.notVoted;
            this.isMyPost = this._userService.isUsersId(this.post.user._id);
        }
    }

    ngOnDestroy() {
        this._navbarService.setCurrentPage(null, null);
    }

    goToUser() {
        this._router.navigate(['profile', this.post.user._id]);
    }

    edit() {
        this._router.navigate(['createpost', this.post._id]);
    }

    async addComment() {
        if (this._userService.isLoggedIn) {
            let addCommentRes = await this._commentService.addCommentPost(this.post._id, { content: this.newComment });
            if (addCommentRes.type === 1000) {
                this.getComments();
                this.newComment = null;
            }
            //TODO if failed
        }
        //TODO Confim modal or so thing cause I want it to be
        else if (confirm('Please login to Comment on an Article'))
            this._router.navigate(['login']);
    }

    upvote = async (callback) => {
        await this._postService.upVote(this.post._id);
        callback();
    }

    downvote = async (callback) => {
        await this._postService.downVote(this.post._id);
        callback();
    }

    unvote = async (callback) => {
        await this._postService.unVote(this.post._id);
        callback();
    }

    async delete(confirm) {
        if (confirm === true) {
            let deleteRes = await this._postService.delete(this.post._id);
            if (deleteRes.type === 1000)
                this._router.navigate(['profile']);
        }
        this.delNeedsConfirm = false;
    }

    showConfirm() {
        this.delNeedsConfirm = true;
    }

    setDateStyle() {
        let timeDifferenceMill = new Date().getTime() - this.post.date;
        if (timeDifferenceMill >= 24 * 60 * 60 * 1000) {
            this.isPostOlderThanOneDay = true;
            this.date = this.post.date;
        }
        else {
            this.isPostOlderThanOneDay = false;
            if (timeDifferenceMill < 60 * 60 * 1000) {
                let timeDifferenceMin = timeDifferenceMill / (60 * 1000);
                let newDate = Math.floor(timeDifferenceMin).toString();
                this.date = newDate + ' Minutes';
            }
            else {
                let timeDifferenceHrs = timeDifferenceMill / (60 * 60 * 1000);
                let newDate = Math.floor(timeDifferenceHrs).toString();
                this.date = newDate + ' Hours';
            }

        }
    }
}
