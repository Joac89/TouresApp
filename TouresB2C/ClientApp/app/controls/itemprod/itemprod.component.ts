import { Component, Input, Inject } from '@angular/core';

@Component({
    selector: 'item-prod',
    templateUrl: './itemprod.component.html',
    styleUrls: ['./itemprod.component.css', '../../style/general.css'],
})
export class ItemprodComponent {
    @Input() code: number | undefined;
    @Input() price: number | undefined;
    @Input() image: string | undefined;
    @Input() date: string | undefined;
    @Input() title: string | undefined;
    @Input() description: string | undefined;
    @Input() rating: number | undefined;

    constructor(@Inject('BASE_URL') baseUrl: string,) {
        this.image = baseUrl + this.image;
    }
}