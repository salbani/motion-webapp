import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import Cropper from 'cropperjs';
import { MediaService } from '../../util/services/media.service';

@Component({
	selector: 'image-cropper',
	templateUrl: './image-cropper.component.html',
	styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit, AfterViewInit, OnChanges {

	@ViewChild('CropperContainer', { static: true }) ICContainerRef: ElementRef;
	@ViewChild('CropperImage', { static: true }) ICImageRef: ElementRef;

	@Output() OnUploadFinished = new EventEmitter<{ success: boolean, link: string }>();

	@Input() Width: string = '100px';
	@Input() Height: string = '100px';
	@Input() Ratio: number = 16 / 9;
	@Input() Source: string = 'img/bg/bg2.jpg';
	@Input('Options') ICOptions: Cropper.Options;

	ICCropper: Cropper;

	IsUploading = false;
	IsSuccessfullyUploaded;

	constructor(private _MediaService: MediaService) { }

	ngAfterViewInit() {
		this.ICOptions = {
			aspectRatio: this.Ratio,
			crop: this.ICCrop,
			zoomable: false
		};
		this.ICCropper = new Cropper(this.ICImageRef.nativeElement, this.ICOptions);
	}

	ngOnInit() {
		this.getRandomNumber();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['Source'] && this.ICCropper) {
			setTimeout(() => {
				this.ICCropper.destroy();
				this.ICCropper = new Cropper(this.ICImageRef.nativeElement, this.ICOptions);
			}, 10);
		}
	}

	ICCrop(e: any) {
	}

	async ICCroppedUpload() {
		let image = this.ICCropper.getCroppedCanvas().toDataURL('image/jpeg');
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
		this.IsUploading = true;
		let uploadRes = await this._MediaService.mediaUpload(imageUploadObj);
		this.IsUploading = false;
		this.IsSuccessfullyUploaded = uploadRes.type === 1000 ? true : false;
		this.OnUploadFinished.emit({ success: this.IsSuccessfullyUploaded, link: uploadRes.path });
	}

	getRandomNumber() {
		let buf: Uint16Array = new Uint16Array(1);
		let numb = window.crypto.getRandomValues(buf);
		return numb[0];
	}
}
