import { Component, Input } from '@angular/core';

@Component({
    selector: 'item-offer',
    templateUrl: './itemoffer.component.html',
    styleUrls: ['./itemoffer.component.css', '../../style/general.css']
})
export class ItemofferComponent {
    @Input() title: string | undefined;
    @Input() price: number | undefined;
    @Input() rating: number | undefined;

    constructor() {
    }
}