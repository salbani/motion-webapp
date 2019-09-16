import { Component, OnInit, Input, EventEmitter, OnDestroy } from '@angular/core';
import { WaveService } from '../../util/services/wave.service';
import { UserService } from '../../util/services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'wavecontroller',
    templateUrl: './wavecontroller.component.html',
})
export class WaveControllerComponent implements OnInit, OnDestroy {

    @Input() id;
    waveIds: string[] = [];
    waves = [];
    alreadyadded: string[] = [];
    modalAction = new EventEmitter<string>();

    constructor(private _waveService: WaveService, private _userService: UserService, private _router: Router) { }

    async ngOnInit() {
        if (this._userService.isLoggedIn) {
            let getWavesRes = await this._waveService.getUserWaves(this._userService.user._id);
            this.waves = getWavesRes.data;
            this.IsAdded();
        }
    }

    ngOnDestroy() {
        this.modalAction.emit('closeModal');
    }

    async addItem(wave) {
        await this._waveService.addItem(wave._id, { post: this.id });
        this.modalAction.emit('toast');
        this.alreadyadded.push(wave);
    }

    async removeItem(wave) {
        await this._waveService.deleteItem(wave._id, { post: this.id });
        this.modalAction.emit('toast');
        this.alreadyadded.splice(this.alreadyadded.indexOf(wave), 1);
    }

    IsAdded() {
        for (let wave of this.waves)
            for (let item of wave.items)
                if (item.post === this.id) {
                    this.alreadyadded.push(wave);
                }
    }

    set() {
        if (this._userService.isLoggedIn)
            this.waveIds.length = 0;
        else {
            this.modalAction.emit('closeModal');
            if (confirm('You need to login')) {
                this._router.navigate(['login']);
            }
        }
    }
}