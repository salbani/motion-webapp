import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../util/services/user.service';

@Component({
    selector: 'loginbytoken',
    template: ''
})

export class LoginByToken implements OnInit {

    constructor(private userService: UserService, private _router: Router, private _aktivatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this._aktivatedRoute.params.subscribe(async params => {
            let token = params['token'];
            if (await this.userService.init(token))
                this._router.navigate(['profile']);
            else
                //TODO error
                this._router.navigate(['err']);
        });
    }
}