import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import { Order } from '../../models/order.model';

@Component({
    selector: 'app',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.css', '../../style/general.css'],
    providers: [CommonService, StoreService]
})
export class StoreComponent {

    orders: Order[] = [];
    products: Product[] = [];
    current: Product = {};
    newCount: number = 0;

    constructor(private router: Router, private configService: CommonService, private storeService: StoreService) {
        this.products = this.storeService.getItemsInCart();
        this.current = {
            id: 0,
            name: "",
            count: 0,
            price: 0
        };
    }

    addOrder() {
        var order1 = this.storeService.newOrderCart();   
        var order2 = this.storeService.newOrderCart();   
        var order3 = this.storeService.newOrderCart();   

        order1.id = 9901;
        order1.count = this.getCountInCart();
        order1.price = this.getTotalInCart();          
        order1.state = 1;
        order1.stateName = "En proceso";
                    
        order2.id = 9905;
        order2.count = this.getCountInCart();
        order2.price = this.getTotalInCart();
        order2.state = 2;
        order2.stateName = "Aprobada";
      
        order3.id = 9944;
        order3.count = this.getCountInCart();
        order3.price = this.getTotalInCart();
        order3.state = 2;
        order3.stateName = "Aprobada";

        this.orders.push(order1);
        this.orders.push(order2);
        this.orders.push(order3);

        localStorage.removeItem("orders");
        localStorage.setItem("orders", JSON.stringify(this.orders));
    }

    getTotalInCart() {
        var sum = 0;
        this.products.forEach(x => {
            sum += (<number>x.price * <number>x.count);
        });

        return sum;
    }

    getCountInCart() {
        var count = 0;
        this.products.forEach(x => {
            count += <number>x.count;
        });

        return count;
    }

    setCurrent(item: Product) {
        this.current = item;
        this.newCount = <number>item.count;
    }

    removeItemInCart() {
        this.storeService.removeItemInCart(<number>this.current.id);
        this.products = this.storeService.getItemsInCart();
    }

    updateItemInCart() {
        if (this.newCount > 0) {
            var product = this.storeService.newItemCart();

            product = this.current;
            product.count = this.newCount;

            this.storeService.updateItemInCart(product);

        } else {
            this.storeService.removeItemInCart(<number>this.current.id);
        }

        this.products = this.storeService.getItemsInCart();
    }

    countUp() {
        this.newCount = this.configService.countUp(this.newCount);
    }

    countDown() {
        this.newCount = this.configService.countDown(this.newCount);
    }
}
