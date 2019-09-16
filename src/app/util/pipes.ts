import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'summaryPipe' })
export class SummaryPipe implements PipeTransform {
  transform(content: string): string {
    let finished = '';
    let parser = new DOMParser();
    let htmlDoc = parser.parseFromString(content, 'text/html');
    let text = this.splitter(htmlDoc.body.children);
    let splitted = text.split('.');
    for (let i = 0; i < 11; i++) {
      if (i < splitted.length)
        finished += splitted[i] + '.';
      else
        i = 11;
    }
    return finished;
  }

  splitter(doc: HTMLCollection): string {
    let text: string = '';
    for (let i = 0; i < doc.length; i++) {
      if (doc.item(i).children.length > 0)
        text += this.splitter(doc.item(i).children);
      else
        text += doc.item(i).innerHTML;
    }
    return text;
  }
}
