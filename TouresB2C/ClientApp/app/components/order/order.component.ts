import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Order } from '../../models/order.model';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css', '../../style/general.css']
})
export class OrderComponent {
    orders: Order[] = [];

    constructor(http: Http) {
        this.getOrders();
    }

    getOrders() {
        if (typeof window !== 'undefined') {
            var json = localStorage.getItem("orders");
            var orders = json ? JSON.parse(json) : [];

            this.orders = orders;
        } else {
            this.orders = [];
        }
    }
}
