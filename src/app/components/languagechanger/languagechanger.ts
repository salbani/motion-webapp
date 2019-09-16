import { Component, EventEmitter, OnInit, Input } from '@angular/core';
import { LanguageService } from '../../util/services/language.service';


@Component({
    selector: 'languagechanger',
    templateUrl: './languagechanger.html',
})


export class LanguageChanger implements OnInit {

    newLanguageToastAction = new EventEmitter<string>();

    @Input() hide = false;


    constructor(private _languageService: LanguageService) { }

    ngOnInit() {
    }

    async changeLanguage(language) {
        await this._languageService.setLanguage(language);
        this.newLanguageToastAction.emit('toast');
    }
}