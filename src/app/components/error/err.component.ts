import { UserService } from './../../util/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'err',
    templateUrl: './err.component.html',
    styleUrls: ['./err.component.css'],
})

export class ErrComponent implements OnInit {
    message: string;

    constructor(private _router: Router, private _params: ActivatedRoute, private _userService: UserService) { }


    ngOnInit() {
        this._params.params.subscribe(params => {
            this.message = params['message'];
        });
    }

    backToLogin() {
        this._userService.logout();
        this._router.navigate(['login']);
    }
}
