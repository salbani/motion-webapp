import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { IUser } from '../interfaces/user';

@Injectable()
export class NavbarService {
    currentComponent: string;
    currentOwner: IUser;

    constructor(private _userService: UserService) { }

    async setCurrentPage(component, owner) {
        this.currentComponent = component;
        this.currentOwner = owner;
        if(owner)
        this.currentOwner.avatar = await this._userService.getUserAvatar(owner);
    }
}