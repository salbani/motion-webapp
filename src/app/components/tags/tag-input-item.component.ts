import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'rl-tag-input-item',
  template:
  `{{text}}
  <i class="ng2-tag-input-remove material-icons"
  (click)="removeTag()">close</i>`,
})
export class TagInputItemComponent {
  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter<number>();
  @HostBinding('class.ng2-tag-input-item-selected') 'selected == true';

  removeTag(): void {
    this.tagRemoved.emit(this.index);
  }
}
