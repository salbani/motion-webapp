import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'interestitem',
    templateUrl: './interest.item.html',
    styleUrls: ['./interest.item.css']
})

export class InterestItem implements OnInit {
    @Input() interest;
    @Input() myInterests = [];
    checked = false;
    @Output() addNewInterest = new EventEmitter();
    @Output() deleteInterest = new EventEmitter();

    ngOnInit() {
        if (this.myInterests.findIndex((value: any) => { if (value === this.interest.name) return true; return false; }) !== -1)
            this.checked = true;
        else
            this.checked = false;
    }

    addInterest() {
        if (!this.checked) {
            this.addNewInterest.emit(this.interest);
            this.checked = true;
        }
        else {
            this.deleteInterest.emit(this.interest);
            this.checked = false;
        }
    }
}