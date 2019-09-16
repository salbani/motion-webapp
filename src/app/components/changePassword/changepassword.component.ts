import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../util/interfaces/user';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';

@Component({
    selector: 'changepassword',
    templateUrl: './changepassword.component.html',
})
export class ChangePasswordComponent implements OnInit {

    user: IUser;
    wrongPassword = false;
    modalAction = new EventEmitter<string>();

    constructor(private _languageService: LanguageService, private _router: Router, private _userService: UserService) { }

    ngOnInit() { }

    async  changePassword(oldPw, newPw, confPw) {
        if (newPw === confPw) {
            let item = {
                newPassword: newPw,
                oldPassword: oldPw
            };
            let data = await this._userService.changePassword(item);
            if (data.type === 1000) {
                this.modalAction.emit('closeModal');
            }
            else {
                this.wrongPassword = true;
            }
        }
        //TODO if passwords dont match
    }
}