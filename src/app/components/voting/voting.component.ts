import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';

@Component({
    selector: 'voting',
    templateUrl: './voting.component.html',
    styleUrls: ['./voting.component.css']
})

export class VotingComponent {
    @Input() votes: number;
    @Input() upvote: (callback: () => void) => void;
    @Input() downvote: (callback: () => void) => void;
    @Input() unvote: (callback: () => void) => void;
    @Input() myVote: Voted = Voted.notVoted;
    voteComment = true;


    constructor(private _languageService: LanguageService, private _router: Router, private _userService: UserService) { }

    upvoted() {
        if (this._userService.isLoggedIn)
            if (this.myVote === Voted.downVoted || this.myVote === Voted.upVoted) {
                this.unvoted();
            } else {
                this.upvote(() => {
                    this.votes++;
                    this.myVote = Voted.upVoted;
                });
            }
        else
            this.logInToVote();
    }

    downvoted() {
        if (this._userService.isLoggedIn)
            if (this.myVote === Voted.downVoted || this.myVote === Voted.upVoted) {
                this.unvoted();
            }
            else {
                this.downvote(() => {
                    this.votes--;
                    this.myVote = Voted.downVoted;
                });
                this.myVote = Voted.downVoted;
            }
        else
            this.logInToVote();
    }

    unvoted() {
        if (this._userService.isLoggedIn)
            this.unvote(() => {
                if (this.myVote === Voted.upVoted)
                    this.votes--;
                else
                    this.votes++;
                this.myVote = Voted.notVoted;
            });
        else
            this.logInToVote();
    }

    logInToVote() {
        //TODO ConfirmComponent
        if (confirm('You need to be logged in to give your useless opinion about this./nDo you wish to log in now ?')) {
            this._router.navigate(['login']);
        }
    }
}

export enum Voted {
    upVoted,
    notVoted,
    downVoted
}