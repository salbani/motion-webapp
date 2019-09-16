import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPost } from '../../util/interfaces/post';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';
import { NavbarService } from '../../util/services/navbar.service';


@Component({
    selector: 'card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.css']
})

export class CardComponent implements OnInit {

    @Input() post: IPost;
    @Input() isDeletable = false;
    @Input() isEditable = false;
    @Output() onDelete = new EventEmitter();

    avatarURL: string;
    delNeedsConfirm = false;
    date;
    isPostOlderThanOneDay = false;

    constructor(private _languageService: LanguageService, private _router: Router, private _userService: UserService, private navbarService: NavbarService) { }

    async ngOnInit() {
        this.avatarURL = await this._userService.getUserAvatar(this.post.user);
        this.setDateStyle();
    }

    goToUser() {
        this._router.navigate(['profile', this.post.user._id]);
    }

    goToPost() {
        this._router.navigate(['article', this.post._id, this.post.title]);
    }

    edit() {
        this._router.navigate(['createpost', this.post._id]);
    }

    delete(confirm) {
        if (confirm === true)
            this.onDelete.emit(this.post);
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
