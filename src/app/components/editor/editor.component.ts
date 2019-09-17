import { Component, OnDestroy, OnInit, EventEmitter, ViewChild, ElementRef, Output, Input, SimpleChanges } from '@angular/core';
import { LanguageService } from '../../util/services/language.service';
import * as Quill from 'quill';

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
})
export class EditorComponent implements OnInit {

    @ViewChild('container', { static: true }) QuillContainer: ElementRef;
    constructor(private _languageService: LanguageService) { }
    @Output() contentOutput = new EventEmitter()
    @Input() content;
    quill: Quill.Quill;


    ngOnInit() {
        var toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']                                         // remove formatting button
        ];
        this.quill = new Quill(this.QuillContainer.nativeElement, {
            modules: {
                toolbar: toolbarOptions
            },
            theme: 'snow'
        })
        this.quill.on('text-change', () => { this.ContentCheck(); })


    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.content && changes.content.currentValue) {
            const newContent = JSON.parse(changes.content.currentValue);
            this.quill.setContents(newContent);
        }
    }

    ContentCheck() {
        let data = {
            content: this.quill.getContents(),
            text: this.quill.getText()
        }
        this.contentOutput.emit(data);
    }

}