import { Component, Input} from '@angular/core';
import { CommonService } from '../../services/common.service';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import * as $ from 'jquery';

@Component({
    selector: 'detail-prod',
    templateUrl: './detailprod.component.html',
    styleUrls: ['./detailprod.component.css', '../../style/general.css'],
    providers: [CommonService, StoreService]
})
export class DetailProdComponent {
    @Input() item: any = {};
    @Input() modal: string = "";
    @Input() callback: Function | undefined;

    private product: Product;

    constructor(private configService: CommonService, private storeService: StoreService) {
        this.product = this.storeService.newItemCart();
    }

    public addToCart(): void {

        this.product.id = this.item.id;
        this.product.price = this.item.price;
        this.product.name = this.item.title;
        this.product.count = this.item.count;

        this.product.extra = {
            tipoHabitacion: this.item.tipoHospedaje,
            precioHotel: this.item.precioHospedaje,
            modalidadTransporte: this.item.tipoTransporte,
            FechaLlegada: this.item.fechaLlegada.split(" ")[0] + "T00:00:00.000001Z", //2018-08-11 00:00:00.0 //2018-12-20T16:20:30.000001Z
            FechaSalida: this.item.fechaSalida.split(" ")[0] + "T00:00:00.000001Z", //2018-08-11 00:00:00.0 //2018-12-20T16:20:30.000001Z
            pais: this.item.pais
        }

        this.storeService.addItemInCart(this.product);
        this.callback;        
    }

    countUp() {
        this.item.count = this.configService.countUp(this.item.count);
    }

    countDown() {
        this.item.count = this.configService.countDown(this.item.count);
    }
}