import { Component, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../util/services/language.service';

@Component({
    selector: 'confirm',
    templateUrl: './confirm.component.html',
})
export class ConfirmComponent {

    @Output() confirmation = new EventEmitter();

    constructor(private _languageService: LanguageService) { }

    yes() {
        this.confirmation.emit(true);
    }

    no() {
        this.confirmation.emit(false);
    }
}
