import { ElementRef, Component, Input } from '@angular/core';

@Component({
    selector: 'autocomplete',
    host: {
        '(document:click)': 'handleClick($event)',
    },
    template: `
        <div class="container" >
            <div class="input-field col s12">
              <input id="searchstring" type="text" class="validate filter-input" [(ngModel)]=query (keyup)=filter()>
              <label for="searchstring">{{placeholder}}</label>
            </div>
            <div class="suggestions" *ngIf="filteredList.length > 0">
                <ul *ngFor="let item of filteredList" >
                    <li >
                        <a (click)="select(item)">{{item}}</a>
                    </li>
                </ul>
            </div>
        </div>  	
        `
})

export class AutocompleteComponent {
    public query = '';
    @Input() searchstring = [];
    @Input() placeholder = '';
    public filteredList = [];
    public elementRef;

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    filter() {
        if (this.query !== '') {
            this.filteredList = this.searchstring.filter(function (el) {
                return el.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.query = item;
        this.filteredList = [];
        return item;
    }

    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    }
}