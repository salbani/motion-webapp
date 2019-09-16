import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';

@Component({
    selector: 'passwordreset',
    templateUrl: './passwordreset.html',
})
export class PasswordResetComponent implements OnInit {

    newpw = {
        newpassword: '',
        token: ''
    };
    confirm: string;
    passwordType;
    token: string;
    showPws = {
        one: false,
        two: false
    };

    constructor(private _languageService: LanguageService, private _router: Router, private _userService: UserService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.newpw.token = params['token'];
        });
    }

    showPw(confirm) {
        if (confirm)
            this.passwordType = document.getElementById('password1');
        else
            this.passwordType = document.getElementById('password');
        if (this.passwordType.type === 'password') {
            this.passwordType.type = 'text';
            if (confirm)
                this.showPws.two = true;
            else
                this.showPws.one = true;
        }
        else {
            this.passwordType.type = 'password';
            if (confirm)
                this.showPws.two = false;
            else
                this.showPws.one = false;
        }
    }

   async reset() {
        if (this.newpw.newpassword === this.confirm)
           await this._userService.newPassword(this.newpw);
    }
}