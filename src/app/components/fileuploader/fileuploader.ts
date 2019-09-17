import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MediaService } from '../../util/services/media.service';
import { UserService } from '../../util/services/user.service';
import { IMedia } from '../../util/interfaces/media';
import { LanguageService } from '../../util/services/language.service';


@Component({
    selector: 'fileuploader',
    templateUrl: './fileuploader.html',
    styleUrls: ['./fileuploader.css']
})

export class FileUploaderComponent implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() croppingRatio: number = 16 / 9;
    @Output() onImageSelected = new EventEmitter<string>();
    @Input() choosenImg;

    uploaderModalAction = new EventEmitter<string>();

    images: IMedia[];

    uploadedImageURL;

    constructor(private _languageService: LanguageService, private _mediaService: MediaService, private _userService: UserService, private _sanitizer: DomSanitizer) { }


    async ngOnInit() {
        await this.getImages();
        this.uploadedImageURL = this.choosenImg ? this.choosenImg : null;
    }

    ngOnDestroy() {
        this.uploaderModalAction.emit('closeModal');
    }

    async getImages() {
        let data = await this._mediaService.getMyImages(this._userService.user._id);
        this.images = data.data;
    }

    async upload(image: string | ArrayBuffer) {
        let imageUploadObj = {
            foo:
            {
                output:
                {
                    name: this.getRandomNumber(),
                    image: image,
                    type: 'image/jpeg'
                }
            }
        };
        let uploadRes = await this._mediaService.mediaUpload(imageUploadObj);
        const isSuccessfullyUploaded = uploadRes.type === 1000 ? true : false;
        this.getImages();
    }

    getRandomNumber() {
        let buf: Uint16Array = new Uint16Array(1);
        let numb = window.crypto.getRandomValues(buf);
        return numb[0];
    }

    choseImg(link: string) {
        this.uploadedImageURL = link;
        this.choosenImg = link;
        this.onImageSelected.emit(link);
    }

    onFileInput(e: any) {
        let files = (e.target as HTMLInputElement).files;
        let URL = window.URL || (window as any).webkitURL;
        if (files && files.length) {
            let file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (ev) => {
                    this.upload(reader.result)
                }
            }
        } else {
            throw new Error('Please select an image');
        }
    }

}
