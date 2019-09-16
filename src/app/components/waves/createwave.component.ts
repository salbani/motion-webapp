import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { WaveService } from '../../util/services/wave.service';
import { Location } from '@angular/common';

@Component({
    selector: 'createwave',
    templateUrl: './createwave.component.html',
})
export class CreateWaveComponent implements OnInit {

    wave = {
        photo: '',
        name: '',
    };

    constructor(private _location: Location, private _activatedRoute: ActivatedRoute, private router: Router, private languageService: LanguageService, private waveService: WaveService) { }

    ngOnInit() {
        this.wave.name = '';
        this.wave.photo = '';
    }

    addPicture(img) {
        this.wave.photo = img.link;
    }

    async  createWave() {
        let createWaveRes = await this.waveService.create(this.wave);
        if (createWaveRes.type === 1000)
            this._location.back();
    }
}