import { Component,  Input } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { IUser } from '../../util/interfaces/user';
import { NavbarService } from '../../util/services/navbar.service';


@Component({
    selector: 'userways',
    templateUrl: './userways.component.html',
})
export class UserWaysComponent  {
    @Input() user: IUser;
    @Input() profile = false;
    userIni;
    constructor(private _navbarService: NavbarService, private _languageService: LanguageService, private _router: Router) { }

    

    goToUser() {
        if (this._navbarService.currentOwner && this._navbarService.currentComponent) {
            if (this._navbarService.currentOwner._id === this.user._id && this._navbarService.currentComponent === 'profile')
                window.scrollTo(0, 0);
            else
                this._router.navigate(['profile', this.user._id]);
        }
        else
            this._router.navigate(['profile', this.user._id]);
    }
}