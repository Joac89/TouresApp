import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { LoaderService } from '../../services/loader.service';
import { StoreService } from '../../services/store.service';

@Component({
    selector: 'detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class DetailComponent {
    products: any = {};
    id: string = "";
    name: string = "";
    current: any = {};
    path: string = "";

    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;

        this.route.params.subscribe(params => {
            var param = params['camp'];
            this.id = param ? atob(param) : "";

            if (this.id != "") {
                var splt = this.id.split("|");

                this.id = splt[0];
                this.name = splt[1];
                this.getProductsByCampaign();
            }
        });

        //this.activatedRoute.queryParams.subscribe(params => {
        //    var param = params['camp'];
        //    this.camp = param ? atob(param) : "";
        //    console.log(this.camp);
        //});
    }

    getProductsByCampaign() {
        this.loaderService.start();

        this.http.get(this.path + "api/campaign/get/" + this.id
        ).map(response => response.json()).subscribe(result => {
            this.products = result;

            console.log(this.products);

            this.loaderService.end();
        }, error => {
            console.error(error);
            this.loaderService.end();
        });
    }

    getDetail(item: any) {
        this.current = item;
        this.current.count = 1;
    }

    update() {
        var carts = this.storeService.getItemsInCart();
        if (this.products.data) {
            for (var i = 0; i < this.products.data.length; ++i) {
                var find = carts.find(x => x.id == this.products.data[i].id);
                if (find) {
                    this.products.data[i].inCart = true;
                    this.products.data[i].countCart = find.count;
                }
            }
        }
    }
}
