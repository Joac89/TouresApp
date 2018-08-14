import { Component, Input } from '@angular/core';
import { ConfigService } from '../service/config.service';

@Component({
    selector: 'item-prod',
    templateUrl: './itemprod.component.html',
    styleUrls: ['./itemprod.component.css', '../../style/general.css'],
    providers: [ConfigService]
})
export class ItemprodComponent {
    @Input() price: number | undefined;
    @Input() image: string | undefined;
    @Input() date: string | undefined;
    @Input() title: string | undefined;
    @Input() description: string | undefined;
    @Input() rating: number | undefined;

    constructor(private config: ConfigService) {
        this.image = config.pathImages + this.image;
    }
}