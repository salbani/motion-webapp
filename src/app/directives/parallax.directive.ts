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
		this.Image.style.maxWidth = "150%";
		this.Image.style.minHeight = (this.speed * 100) + "%";
		this.Image.style.transform = "translateX(-50%)";
		this.Image.style.left = "50%"
		this.Image.style.height = "auto";
		this.Image.style.position = "absolute";
	}

	UpdateParallax(event: Event): any {
		let containerHeight = this.Container.offsetHeight;
		this.Image.style.top = (-1 * (this.Image.height - containerHeight) * ((0.5 - this.speed / 2) + (this.speed * (this.Container.getBoundingClientRect().top + (containerHeight / 2)) / (window.innerHeight)))) + "px";
	}
}