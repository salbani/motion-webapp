import { Voted } from '../voting/voting.component';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IComment, ISubComment } from '../../util/interfaces/Comment';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';
import { CommentService } from '../../util/services/comment.service';

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
    @Input() comment: IComment;
    @Input() commentsEnabled = true;
    @Input() commentId: string;
    @Output() addCommentComment = new EventEmitter();
    isCommenting = false;
    myVote: Voted;
    newComment: string;

    constructor(private _languageService: LanguageService, private _router: Router, private _commentService: CommentService, private _userService: UserService) { }

    async  ngOnInit() {
        if (this._userService.isLoggedIn) {
            this.myVote = (this.comment.downvoted.indexOf(this._userService.user._id) >= 0) ? Voted.downVoted : (this.comment.upvoted.indexOf(this._userService.user._id) >= 0) ? Voted.upVoted : Voted.notVoted;
        }
        if (this.comment.comments)
            this.comment.comments.sort(this.compare);
    }

    goToUser() {
        this._router.navigate(['profile', this.comment.user]);
    }

    compare(a: ISubComment, b: ISubComment) {
        if (a.score > b.score)
            return -1;
        else if (a.score < b.score)
            return 1;
        else
            return 0;
    }

    showCommentArea() {
        this.isCommenting = true;
    }

    closeCommentArea() {
        this.isCommenting = false;
    }

    async addComment() {
        if (this._userService.isLoggedIn) {
            let addCommentRes = await this._commentService.addCommentComment(this.comment._id, { content: this.newComment});
            if (addCommentRes.type === 1000) {
                this.addCommentComment.emit();
                this.newComment = null;
                this.isCommenting = false;
            }
            //TODO if failed
        }
        //TODO Confim modal or so thing cause I want it to be
        else if (confirm('Please login to Comment on an Article'))
            this._router.navigate(['login']);
    }

    upvote = async (callback) => {
        if (this.commentsEnabled)
            await this._commentService.upVote(this.comment._id);
        else
            await this._commentService.commentupVote(this.comment._id, this.commentId);
        callback();

    }

    downvote = async (callback) => {
        if (this.commentsEnabled)
            await this._commentService.downVote(this.comment._id);
        else
            await this._commentService.commentdownVote(this.comment._id, this.commentId);
        callback();

    }

    unvote = async (callback) => {
        {
            if (this.commentsEnabled)
                await this._commentService.unVote(this.comment._id);
            else
                await this._commentService.commentunVote(this.comment._id, this.commentId);
            callback();
        }
    }
}