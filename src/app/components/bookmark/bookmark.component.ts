import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../util/services/user.service';
import { WaveService } from '../../util/services/wave.service';
import { IWave, IWaveItem } from '../../util/interfaces/wave';

@Component({
    selector: 'bookmark',
    templateUrl: './bookmark.component.html',
})

export class BookmarkComponent implements OnInit {

    @Input() postId;
    bookmarks: IWaveItem[] = [];
    isBookmarked = false;

    constructor(private waveService: WaveService, private _router: Router, private _userService: UserService) { }

    async ngOnInit() {
        if (this._userService.isLoggedIn) {
            if (this._userService.user.bookmarks) {
                let getWaveRes = await this.waveService.getWave(this._userService.user.bookmarks);
                let wave: IWave = getWaveRes.data;
                for (let item of wave.items) {
                    this.bookmarks.push(item);
                }
                for (let bookmark of this.bookmarks) {
                    if (bookmark.post === this.postId)
                        this.isBookmarked = true;
                }
            }
        }
    }

    async bookmark() {
        let itemId;
        if (this._userService.isLoggedIn) {
            if (!(this.isBookmarked === true)) {
                this.waveService.addItem(this._userService.user.bookmarks, { post: this.postId });
                this.isBookmarked = true;
            }
            else {
                for (let bookmark of this.bookmarks) {
                    if (bookmark.post === this.postId)
                        itemId = bookmark._id;
                }
                this.waveService.deleteItem(this._userService.user.bookmarks, itemId);
                this.isBookmarked = false;
            }
        }
        else
            //TODO AlertComponent
            if (confirm('You need to login')) {
                this._router.navigate(['login']);
            }
    }
}