import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { StoreService } from '../../services/store.service';
import { Product } from '../../models/product.model';
import { CheckControl } from '../../models/check.control';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css', '../../style/general.css'],
    providers: [StoreService, AuthService]
})
    //implements OnDestroy
export class NavMenuComponent {
    watcherStore: any;
    products: Product[] = [];
    //subscription: Subscription;
    authenticate: any = { status: false };

    constructor(private router: Router, private storeService: StoreService, private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
        this.watcherStore = this.watcherMethod();
        //this.subscription = this.authService.auth.subscribe((val: boolean) => {
        //    this.authenticate = val;
        //});
    }

    clearIntervalMethod() {
        clearInterval(this.watcherStore);
    }

    watcherMethod() {
        if (isPlatformBrowser(this.platformId)) {
            setInterval(() => {
                this.products = this.storeService.getItemsInCart();

                if (this.authService.isAuthorized()) {
                    this.authenticate = JSON.parse(this.authService.get());
                    this.authenticate.names = this.authenticate.data.fName;
                } else {
                    this.authenticate = { status: false };
                }
            }, 1000)
        }
    }

    //ngOnDestroy() {
    //    this.subscription.unsubscribe();
    //}

    //logout() {
    //    this.authenticate = { status: false };
    //    this.authService.logout();
    //    this.router.navigate(['home']);
    //}

    //####################################################//

    check = new CheckControl(1, "Sin filtro");

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