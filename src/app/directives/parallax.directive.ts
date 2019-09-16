import { Directive, AfterViewInit, ViewContainerRef } from '@angular/core';

@Directive({
	selector: '[parallax]'
})
export class ParallaxDirective implements AfterViewInit {

	Container: HTMLElement;
	Image: HTMLImageElement;

	speed = 0.2;

	constructor(private viewContainer: ViewContainerRef) {
		this.Image = viewContainer.element.nativeElement;
	}

	ngAfterViewInit() {
		this.Container = this.Image.parentElement;
		if (this.Image) {
			this.Image.onload = () => {
				window.addEventListener("scroll", (ev) => this.UpdateParallax(ev));
				this.setParallaxImage();
				this.UpdateParallax(null);
			}
		} else {
			throw new Error("the parallax container has no image inside")
		}
	}

	private setParallaxImage() {
		//set img style
		this.Image.style.minWidth = "100%";
		this.Image.style.minHeight = (this.speed * 100) + "%";
		this.Image.style.transform = "translateX(50%)";
		this.Image.style.left = "50%"
		this.Image.style.height = "auto";
		this.Image.style.position = "absolute";
		this.Image.style.zIndex = "-1";

		// wrap image with a div, then set style
		var imgWrapperEl: HTMLElement = <HTMLElement>this.Container.querySelector('.parallax-img-wrapper');
		if (!imgWrapperEl) {
			imgWrapperEl = document.createElement('div');
			imgWrapperEl.className = 'parallax-img-wrapper';
			imgWrapperEl.appendChild(this.Image);
			this.Container.appendChild(imgWrapperEl);
		}

		Object.assign(imgWrapperEl.style, {
			position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: "hidden"
		});
	}

	UpdateParallax(event: UIEvent): any {
		let containerHeight = this.Container.offsetHeight;
		this.Image.style.top = (-1 * (this.Image.height - containerHeight) * ((0.5 - this.speed / 2) + (this.speed * (this.Container.getBoundingClientRect().top + (containerHeight / 2)) / (window.innerHeight)))) + "px";
	}
}