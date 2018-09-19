import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class NavMenuComponent {
    watcherStore: any;
    products: Product[] = [];

    constructor(private router: Router, private storeService: StoreService, @Inject(PLATFORM_ID) private platformId: Object) {
        this.watcherStore = this.watcherMethod();
    }

    clearIntervalMethod() {
        clearInterval(this.watcherStore);
    }

    watcherMethod() {
        if (isPlatformBrowser(this.platformId)) {
            setInterval(() => {
                this.products = this.storeService.getItemsInCart();
            }, 1000)
        }
    }

    //####################################################//

    check = new checkControl(1, "Sin filtro");

    searchForm = new FormGroup({
        textSearch: new FormControl(''),
        dateSearch: new FormControl(''),
        checkSearch: new FormControl(''),
    });

    sendSearch() {
        var text = this.searchForm.value.textSearch;
        var id = this.check.id;

        this.searchForm.reset();
        this.changeFilter(1, "Sin filtro");
        this.router.navigate(["product",
            {
                search: btoa(text),
                type: id
            }
        ]);
    }

    changeFilter(id: number, text: string) {
        this.check.id = id;
        this.check.text = text;
    }
}

export class checkControl {
    id: number | undefined;
    text: string | undefined;

    constructor(id_: number, text_: string) {
        this.id = id_;
        this.text = text_;
    }
}