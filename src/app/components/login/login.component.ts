import { config } from './../../constants/config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    error = false;
    showPassword = false;
    credentials = {
        email: '',
        password: ''
    };

    constructor(private _languageService: LanguageService, private _userService: UserService, private _router: Router) {
    }

    ngOnInit() {
        if (this._userService.isLoggedIn)
            this._router.navigate(['profile']);
    }

    async  onLogin() {
        let loginRes = await this._userService.login(this.credentials);
        if (loginRes.type === 1000) {
            if (await this._userService.init(loginRes.data.token))
                this._router.navigate(['profile']);
            else
                this.error = true;
        }
        else if (loginRes.type === 1100) {
            this.error = true;
        }
    }
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
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