import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';
import { IUser } from '../../util/interfaces/user';

@Component({
    selector: 'edituser',
    templateUrl: './editUser.component.html',
})
export class EditUserComponent implements OnInit, OnDestroy {

    user: IUser;
    delNeedsConfirm = false;
    isUserMe = true;
    modalActions = new EventEmitter<string>();

    constructor(private _languageService: LanguageService, private _router: Router, private _userService: UserService) { }

    async ngOnInit() {
        if (await this._userService.isLoggedIn) {
            this.user = this._userService.user;
        }
        else
            this._router.navigate(['login']);
    }

    ngOnDestroy() {
        this.modalActions.emit('closeModal');
    }

    addBackground(link) {
        this.user.landscape = link;
    }

    addAvatar(link) {
        this.user.avatar = link;
    }

    showConfirm() {
        this.delNeedsConfirm = true;
    }

    async updateUser() {
        let data = await this._userService.update(this.user, this.user._id)
        if (data.type === 1000)
            this._router.navigate(['profile']);
    }

    async deleteUser(confirm) {
        if (confirm === true)
            await this._userService.delete(this._userService.user._id);
        this.delNeedsConfirm = false;
    }
}
