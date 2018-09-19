import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ConfigService } from '../../services/config.service';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { validateConfig } from '@angular/router/src/config';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class HomeComponent {
    principals: any = {};
    campaign: any = {};
    current: any = {};    
    count: number = 0;
    path: string = "";
    
    constructor(@Inject('BASE_URL') baseUrl: string, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        
        this.getPrincipals();
        this.getCampaign();
    }

    getPrincipals() {
        this.loaderService.start();

        this.http.get(this.path + "api/product").map(response => response.json()).subscribe(result => {
            this.principals = result;
            this.update();

            this.loaderService.end();
        }, error => console.error(error));
    }

    getCampaign() {
        this.loaderService.start();

        this.http.get(this.path + "api/campaign").map(response => response.json()).subscribe(result => {
            this.campaign = result;

            this.loaderService.end();
        }, error => console.error(error));
    }

    goToCampaign(id: number) {
    }

    getDetail(item: any) {
        this.current = item;
        this.current.count = 1;
    }

    update() {
        var carts = this.storeService.getItemsInCart();
        if (this.principals.data) {
            for (var i = 0; i < this.principals.data.length; ++i) {
                var find = carts.find(x => x.id == this.principals.data[i].id);
                if (find) {
                    this.principals.data[i].inCart = true;
                    this.principals.data[i].countCart = find.count;
                }
            }
        }
    }
}
