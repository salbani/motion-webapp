import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';
import { NavbarService } from '../../util/services/navbar.service';

@Component({
    selector: 'connecteduser',
    templateUrl: './connecteduser.component.html',
    styleUrls: ['./connecteduser.component.css']

})

export class ConnectedUserComponent {

    following = [];
    connection: Connection = Connection.disconnected;
    user;

    constructor(private navbarService: NavbarService, private _languageService: LanguageService, private _router: Router, private _userService: UserService) { }

    async ngOnInit() {
        this.user = this.navbarService.currentOwner;
        for (let userId of this._userService.user.following) {
            let data = await this._userService.find(userId);
            this.following.push(data.data);
        }

    }
    async connect(user) {
        if (this._userService.isLoggedIn) {
            if (this.connection === Connection.connected) {
                await this._userService.connect(user._id);
                this.connection = Connection.disconnected;
            }
            else {
                await this._userService.disconnect(user._id);
                this.connection = Connection.connected;
                this.disconectUser(user);
            }
        }
        else
            if (confirm('You need to login')) {
                this._router.navigate(['login']);
            }
    }

    disconectUser(user) {
        let index = this.following.indexOf(user);
        this.following.splice(index, 1);
    }
}
enum Connection {
    connected,
    disconnected
}