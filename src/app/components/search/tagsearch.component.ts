import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TagService } from '../../util/services/tag.service';
import { PostService } from '../../util/services/post.service';
import { ITag } from '../../util/interfaces/tag';

@Component({
    selector: 'tagsearch',
    templateUrl: './tagsearch.component.html',
})

export class TagSearchComponent {

    // @Output() tagSearch = new EventEmitter();
    // private searchStr: string;
    // private dataService: CompleterData;
    // private searchData: ITag[];

    // constructor(private _postService: PostService, private _tagService: TagService, private _completerService: CompleterService) {
    //     this.dataService = _completerService.local(this.searchData, '', '');
    // }

    // async ngOnInit() {
    //     let tags = await this._tagService.getTags();
    //     this.searchData = tags.data;
    // }

    // async getSelected(selection) {
    //     let posts = await this._postService.getTagPosts(selection, null);
    //     this.tagSearch.emit(posts);
    // }
}