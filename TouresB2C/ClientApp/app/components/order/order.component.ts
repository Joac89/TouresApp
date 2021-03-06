import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { CommonService } from '../../services/common.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { StoreService } from '../../services/store.service';
import { TokenService } from '../../services/token.service';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css', '../../style/general.css'],
    providers: [AuthService, StoreService, TokenService]
})
export class OrderComponent {
    orders: any[] = [];
    items: any[] = [];
    showItems: any[] = [];
    path: string = "";
    orderItem: number = 0;
    username: string = "";
    selected: number = 0;
    orderForDelete: number = 0;

    constructor(@Inject('BASE_URL') baseUrl: string, private router: Router, private http: Http, private tokenService: TokenService, private loaderService: LoaderService, private authService: AuthService) {
        this.getOrders();
    }

    sumQ(): number {
        var sum = 0;
        this.showItems.forEach(x => {
            sum += x.quantity;
        })
        return sum;
    }

    sumP(): number {
        var sum = 0;
        this.showItems.forEach(x => {
            sum += (x.price * x.quantity);
        })
        return sum;
    }

    deleteOrder(id: number) {
        this.loaderService.start();

        var token = this.tokenService.getTokenHeader();
        this.http.delete(this.path + "api/order/delete/" + id, token).map(response => response.json()).subscribe(result => {

            if (result.code == 200) this.getOrders();

            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });
    }

    showOrderItems(items: any[], order: number) {
        this.orderItem = order;
        this.showItems = items;
        this.selected = order;
    }

    getOrders() {
        this.loaderService.start();

        if (typeof window !== 'undefined') {
            var user = JSON.parse(this.authService.get());
            var token = this.tokenService.getTokenHeader();
            var q = 0;

            var token = this.tokenService.getTokenHeader();
            this.http.get(this.path + "api/order/get/" + user.custId, token).map(response => response.json()).subscribe(result => {

                this.orders = result.data;
                this.orders.forEach(x => {
                    x.statusName = x.status == "1" ? "Pendiente" : x.status == "2" ? "Aprobada" : "Eliminada";
                    this.items = x.lItems;
                    this.items.forEach(y => {
                        q += <number>y.quantity;
                    });
                    x.quantity = q;
                    q = 0;
                    this.username = user.fName;
                });

                this.loaderService.end();
            }, error => {
                this.loaderService.end();
                console.error(error);
            });


            //this.orders = orders;
        } else {
            this.orders = [];
        }
    }

    lockedCancel(id: number) {
        //console.log(id);
        return id == 2 || id == 0 ? false : true;
    }
}
