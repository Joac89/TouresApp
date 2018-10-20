import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { CheckControl } from '../../models/check.control';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';

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
                    this.authenticate.names = this.validateName();
                    //this.authenticate.names = this.authenticate.fName + " " + this.authenticate.lName.split(" ")[0];
                } else {
                    this.authenticate = { status: false };
                }
            }, 1000)
        }
    }

    validateName(): string {
        //var lname = this.authenticate.lname ? this.authenticate.lname : this.authenticate.lName;
        //var fname = this.authenticate.fname ? this.authenticate.fname : this.authenticate.fName;

        var lname = this.authenticate.lName;
        var fname = this.authenticate.fName;

        return fname + " " + lname.split(" ")[0];
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