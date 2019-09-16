import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { WaveService } from '../../util/services/wave.service';

@Component({
    selector: 'wavesprew',
    templateUrl: './wavesprev.component.html',
    styleUrls: ['./wavesprev.component.css']
})
export class WavesPrevComponent implements OnInit {

    @Input() userId;
    waves;
    noContent = false;

    constructor(private router: Router, private _languageService: LanguageService, private _waveService: WaveService) { }

    async ngOnInit() {
        let getWavesRes = await this._waveService.getUserWaves(this.userId);
        if (getWavesRes.type === 1000)
            this.waves = getWavesRes.data;
        else
            this.noContent = true;
    }

    goToWave(id) {
        this.router.navigate(['waves', id]);
    }
}