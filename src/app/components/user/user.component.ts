import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { IUser } from '../../util/interfaces/user';
import { PostService } from '../../util/services/post.service';
import { UserService } from '../../util/services/user.service';
import { NavbarService } from '../../util/services/navbar.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnChanges {

    @Input() user: IUser;
    @Input() isUserMe = false;
    connection: Connection = Connection.connected;
    imageUrl: string;
    userinfo;
    weburl: string;
    following: number;
    followers: number;

    constructor(private _languageService: LanguageService, private _route: ActivatedRoute, private _userService: UserService, private _router: Router, private _navbarService: NavbarService) { }

    async ngOnInit() {
        this.imageUrl = await this._userService.getUserAvatar(this.user);
        this.following = this.user.following.length;
        this.followers = this.user.followers.length;
        this.weburl = this.user.homepage ? (this.user.homepage.indexOf('http://') >= 0 ? this.user.homepage : 'http://' + this.user.homepage) : null;
        if (this._userService.isLoggedIn) {
            this.connection = (await this._userService.user.following.indexOf(this.user._id) >= 0) ? Connection.disconnected : Connection.connected;
        }
    }

    async ngOnChanges() {
        this.imageUrl = await this._userService.getUserAvatar(this.user);
    }

    async connect() {
        if (this._userService.isLoggedIn) {
            if (!(this.connection === Connection.connected)) {
                await this._userService.disconnect(this.user._id);
                this.connection = Connection.connected;
                this.followers = this.followers - 1;
            }
            else {
                await this._userService.connect(this.user._id);
                this.connection = Connection.disconnected;
                this.followers = this.followers + 1;
            }
        }
        else
            //TODO ConfirmComponent
            if (confirm('You need to login')) {
                this._router.navigate(['login']);
            }
    }
}

enum Connection {
    connected,
    disconnected
}