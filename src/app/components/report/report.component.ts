import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ReportService } from '../../util/services/report.service';

@Component({
    selector: 'report',
    templateUrl: '../report/report.component.html',
})
export class ReportComponent implements OnInit {
    @Input() type;
    @Input() id;
    reportsended = new EventEmitter<string>();
    sendReport = false;
    reportItem = {
        reason: null,
        reportTo: null,
        type: null
    };

    constructor(private _reportService: ReportService) { }

    ngOnInit() {
        
        this.reportItem.reportTo = this.id;

        if (this.type === 'user')
            this.reportItem.type = type.user;
        else
            this.reportItem.type = type.post;
    }

    async  report() {
        let reportRes = await this._reportService.report(this.reportItem)
        if (reportRes.type === 1000)
            this.reportsended.emit('toast');
        else
            throw new Error(reportRes.message)
        this.sendReport = false;
    }
}

enum type {
    post,
    user
}