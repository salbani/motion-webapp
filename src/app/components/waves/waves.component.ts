import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { WaveService } from '../../util/services/wave.service';
import { UserService } from '../../util/services/user.service';
import { PostService } from '../../util/services/post.service';
import { IWave } from '../../util/interfaces/wave';
import { IPost } from '../../util/interfaces/post';
import { NavbarService } from '../../util/services/navbar.service';


@Component({
    selector: 'waves',
    templateUrl: './waves.component.html',
    styleUrls: ['./waves.component.css']
})
export class WavesComponent implements OnInit {

    waves: IWave[] = [];
    posts: IPost[] = [];
    waveId: string;
    wave: IWave;
    bookmarks;
    isUserMe: boolean;
    noContent = false;
    confirmComponent = false;

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _languageService: LanguageService, private _waveService: WaveService, private _userService: UserService, private _postService: PostService, private _navbarService: NavbarService) { }

    async ngOnInit() {
        this._navbarService.setCurrentPage('waves', this._userService.user);
        this._activatedRoute.params.subscribe(params => { this.waveId = params['id']; });
        if (this.waveId) {
            let getWaveRes = await this._waveService.find(this.waveId);
            if (getWaveRes.type === 1000) {
                this.wave = getWaveRes.data;
                for (let item of this.wave.items) {
                    let getPostRes = await this._postService.find(item.post);
                    if (getPostRes.type === 1000)
                        this.posts.push(getPostRes.data);
                }
                if (this.wave.items.length === 0)
                    this.noContent = true;
            }
            this.isUserMe = this._userService.isUsersId(this.wave.user._id);

        }
        if (!this.waveId) {
            let waves = await this._waveService.getUserWaves(this._userService.user._id);
            if (waves.type === 1000)
                this.waves = waves.data;
            else
                this.noContent = true;
        }
    }


    goToWave(id) {
        this._router.navigate(['waves', id]);
    }

    goToPost(id) {
        this._router.navigate(['Article', id]);
    }

    async  removeItem(id) {
        for (let item of this.wave.items)
            if (item.post === id || item.user === id) {
                let itemId = item._id;
                await this._waveService.deleteItem(this.waveId, itemId);
                this.posts.splice(this.posts.findIndex((post) => { if (post._id === id) return true; return false; }));
                this.wave.items.length--;
            }
    }
}