import { Component } from '@angular/core';
import { config } from './../../constants/config';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';

@Component({
    selector: 'signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
})
export class SignupComponent {

    showPassword = false;
    error = false;
    credentials = {
        email: '',
        password: ''
    };
    constructor(private _languageService: LanguageService, private _userService: UserService, private _router: Router) { }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    async onSignup() {
        let createRes = await this._userService.create(this.credentials);
        if (createRes.type === 1000) {
            let loginRes = await this._userService.login(this.credentials);
            if (await this._userService.init(loginRes.data.token)) {
                this._router.navigate(['profile']);
            }
        }
        else
            this.error = true;
    }

    wordpress() {
        window.location.replace(config.API_URL + '/user/login/wordpress');
    }

    twitter() {
        window.location.replace(config.API_URL + '/user/login/twitter');
    }

    facebook() {
        window.location.replace(config.API_URL + '/user/login/facebook');
    }

    google() {
        window.location.replace(config.API_URL + '/user/login/google');
    }
}