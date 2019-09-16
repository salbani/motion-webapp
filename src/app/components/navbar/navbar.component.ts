import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';
import { NavbarService } from '../../util/services/navbar.service';


@Component({
	selector: 'navbar',
	templateUrl: '../navbar/navbar.component.html',
	styleUrls: ['../navbar/navbar.component.css']
})

export class NavbarComponent implements OnInit {
	sidenavActions = new EventEmitter<any>();
	sidenavParams = [];
	user;

	constructor(private _languageService: LanguageService, private _userService: UserService, private _router: Router, private _navbarService: NavbarService, private el: ElementRef) { }

	async ngOnInit() {
		this.user = this._userService.user;
	}

	logout() {
		this._userService.logout();
		this._router.navigate(['login']);
	}

	close() {
		this.sidenavParams = ['show'];
		this.sidenavActions.emit('sideNav');
	}

	destroy() {
		this.sidenavParams = ['destroy'];
		this.sidenavActions.emit('sideNav');
	}
}