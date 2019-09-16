import { Component, OnInit } from '@angular/core';
import { UserService } from './util/services/user.service';
import { LanguageService } from './util/services/language.service';
import { InitResolver } from './util/services/InitReslover.service';

@Component({
	selector: 'my-app',
	template: `<div *ngIf="isInitialized">
				<navbar></navbar>
				</div>
				<router-outlet></router-outlet>
				`,
})
export class AppComponent implements OnInit {

	isInitialized = false;

	constructor(private _userService: UserService, private _languageService: LanguageService) {
	}

	ngOnInit() {
		InitResolver.OnInit.subscribe(val => {
			this.isInitialized = InitResolver.isInitialized;
		})
		this.isInitialized = InitResolver.isInitialized;
	}
}
