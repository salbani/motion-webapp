import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'controllitem',
    templateUrl: './wavecontroller.item.html',
    styleUrls: ['./wavecontroller.item.css']
})

export class WaveControllerItemComponent implements OnInit {
    @Input() wave;
    @Input() myWaves = [];
    checked = false;
    @Output() addTo = new EventEmitter();
    @Output() removeFrom = new EventEmitter();

    ngOnInit() {
        if (this.myWaves.findIndex((value: any) => { if (value === this.wave) return true; return false; }) !== -1)
            this.checked = true;
        else
            this.checked = false;
    }

    addWave() {
        if (!this.checked) {
            this.addTo.emit(this.wave);
            this.checked = true;
        }
        else {
            this.removeFrom.emit(this.wave);
            this.checked = false;
        }
    }
}