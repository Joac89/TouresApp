import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-title',
    templateUrl: './pagetitle.component.html',
    styleUrls: ['./pagetitle.component.css', '../../style/general.css']
})
export class PagetitleComponent {
    @Input() title: string | undefined;
    @Input() subtitle: string | undefined;
    @Input() reference: string | undefined;

    constructor() {
    }
}