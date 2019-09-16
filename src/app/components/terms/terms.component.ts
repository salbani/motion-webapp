import { Component } from '@angular/core';
import { LanguageService } from '../../util/services/language.service';

@Component({
    selector: 'terms',
    templateUrl: './terms.component.html',
})

export class TermsComponent {
    constructor(private _languageService: LanguageService){}
}