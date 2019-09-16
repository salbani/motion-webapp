import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../../util/services/language.service';
import { UserService } from '../../util/services/user.service';
import { MediaService } from '../../util/services/media.service';
import { IUser } from '../../util/interfaces/user';

@Component({
    selector: 'interests',
    templateUrl: './interest.component.html',
    styleUrls: ['./interest.component.css']
})

export class InterestsComponent implements OnInit {
    
    interests: { name: string; photo: string; related?: string[]; }[] = [
        {
            name: 'Sport',
            photo: 'http://assets.bluefingroup.co.uk/media/filer_public_thumbnails/filer_public/30/dc/30dcb5b3-815d-4e4c-af3e-d2823050911c/sports_montage_-_chosen_concept_v9_carouselv3_rgb.jpg__1600x580_q85_crop_upscale.jpg',
            related: [
                'Fußball',
                'Golf',
            ]
        },
        {
            name: 'Business',
            photo: 'https://cdn.pixabay.com/photo/2016/03/26/13/09/organic-1280537_960_720.jpg',
        }
    ];

    relateds: { name: string; photo: string; related?: string[]; }[] = [
        {
            name: 'Fußball',
            photo: 'http://bilder.t-online.de/b/71/33/88/98/id_71338898/610_80/tid_da/nicht-nur-in-der-bundesliga-rollt-der-ball-.jpg',
        }, {
            name: 'Golf',
            photo: 'http://www.cargosoft.de/wp-content/uploads/pic3.jpg',
            related: [
                'Golfcloth',
            ]
        },
        {
            name: 'Golfcloth',
            photo: 'https://sc01.alicdn.com/kf/HTB1ILZ6KpXXXXa6XXXXq6xXFXXXi/Cool-fit-Sublimation-Mens-Golf-Cloth-Golf.jpg_350x350.jpg'
        },
        {
            name: 'Sport',
            photo: 'http://assets.bluefingroup.co.uk/media/filer_public_thumbnails/filer_public/30/dc/30dcb5b3-815d-4e4c-af3e-d2823050911c/sports_montage_-_chosen_concept_v9_carouselv3_rgb.jpg__1600x580_q85_crop_upscale.jpg',
            related: [
                'Fußball',
                'Golf',
            ]
        },
        {
            name: 'Business',
            photo: 'http://www.va.gov/osdbu/images/businessMeeting.jpg',
        }
    ];

    myInterests = null;

    constructor(private _languageService: LanguageService, private _router: Router, private _userService: UserService) { }

    async  ngOnInit() {
        this.myInterests = this._userService.user.interests;
        if (this.myInterests)
            for (let interest of this.myInterests) {
                if (this.interests.findIndex((value: any) => { if (value.name === interest) return true; return false; }) === -1) {
                    this.addInterest(interest);
                }
                else
                    this.addRelated(interest);
            }
    }


    addNewInterest(interest, type) {
        if (type) {
            this.myInterests.push(interest.name);
            if (interest.related)
                this.addRelated(interest.name);
        }

        else {
            this.myInterests.splice(this.myInterests.indexOf(interest.name), 1);
            if (interest.related)
                this.deleteRelated(interest.name);
        }
    }

    async  updateInterests() {
        await this._userService.update({ interests: this.myInterests }, this._userService.user._id);
    }

    addInterest(interest) {
        if (this.interests.findIndex((value: any) => { if (value.name === interest) return true; return false; }) === -1)
            this.interests.push(this.relateds[this.relateds.findIndex((value: any) => { if (value.name === interest) return true; return false; })]);
        if (this.relateds[this.relateds.findIndex((value: any) => { if (value.name === interest) return true; return false; })].related)
            this.addRelated(interest);
    }

    addRelated(interest) {
        if (this.relateds[this.relateds.findIndex((value: any) => { if (value.name === interest) return true; return false; })].related)
            for (let relate of this.relateds[this.relateds.findIndex((value: any) => { if (value.name === interest) return true; return false; })].related) {
                if (this.interests.findIndex((value: any) => { if (value.name === relate) return true; return false; }) === -1)
                    this.interests.push(this.relateds[this.relateds.findIndex((value: any) => { if (value.name === relate) return true; return false; })]);
            }
    }

    deleteRelated(interest) {
        for (let relate of this.relateds[this.relateds.findIndex((value: any) => { if (value.name === interest) return true; return false; })].related) {
            let index = this.interests.findIndex((value: any) => { if (value.name === relate) return true; return false; });
            if (index >= 0) {
                this.interests.splice(index, 1);
                this.myInterests.splice(this.myInterests.indexOf(relate), 1);
            }
            if (this.relateds[this.relateds.findIndex((value: any) => { if (value.name === relate) return true; return false; })].related)
                this.deleteRelated(relate);
        }
    }
}