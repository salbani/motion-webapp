import { Injectable, EventEmitter } from '@angular/core';
import { UserService } from './user.service';
import { LanguageService } from './language.service';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';

@Injectable()
export class InitResolver implements Resolve<boolean> {
    static isInitialized = false;
    static OnInit = new EventEmitter();
    constructor(private _userService: UserService, private _languageService: LanguageService, private router: Router) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        if (!InitResolver.isInitialized)
            return this.Init();
        else
            return true;
    }

    async Init() {
        await this._userService.init();
        await this._languageService.setLanguage();
        InitResolver.isInitialized = true;
        InitResolver.OnInit.emit();
        return true;
    }
}