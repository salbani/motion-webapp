import { Component, OnDestroy, OnInit, EventEmitter, ViewChild, ElementRef, Output, Input } from '@angular/core';
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
    placeholderContent = "Write Something";
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
        if (this.content === '')
            this.content = this.quill.insertText(0, this.placeholderContent)
        else
            this.content = JSON.parse(this.content)
        this.quill.setContents(this.content);


    }
    ContentCheck() {
        let data = {
            content: this.quill.getContents(),
            text: this.quill.getText()
        }
        this.contentOutput.emit(data);
    }

}