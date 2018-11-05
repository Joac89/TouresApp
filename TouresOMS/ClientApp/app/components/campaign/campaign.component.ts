import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import { CheckControl } from '../../models/check.control';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class CampaignComponent {
    search: any = {};
    aux: any = {};
    textSearch: string = "";
    typeSearch: number = 0;
    current: any = {};
    pag: number = 0;
    endPage: boolean = false;
    path: string = "";


    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        this.route.params.subscribe(params => {
            this.textSearch = params['search'];
            this.typeSearch = params['type'];
            this.search.data = [];
            this.getCampaign();
        }); 
    }

    getCampaign() {
        this.loaderService.start();
        this.pag += 1;
        if (this.pag > 1) {
            this.textSearch = btoa(this.textSearch);
        } else {
            this.pag = 1;
            this.endPage = false;
        }
        //this.http.get(this.path + "api/campaign/all").map(response => response.json()).subscribe(result => {
          this.http.get(this.path + "api/campaign/all").map(response => response.json()).subscribe(result => {
            this.aux = result;

            if (this.aux.data.length == 0 || this.aux.data.length < 4) this.endPage = true;

            var carts = this.storeService.getItemsInCart();
            for (var i = 0; i < this.aux.data.length; ++i) {
                var find = carts.find(x => x.id == this.aux.data[i].id);
                if (find) {
                    this.aux.data[i].inCart = true;
                    this.aux.data[i].countCart = find.count;
                }
            }
            for (var i = 0; i < this.aux.data.length; ++i) {
                this.search.data.push(this.aux.data[i]);
            }

            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
            });
        //this.textSearch = atob(this.textSearch);
    }

    getDetail(item: any) {
        this.current = item;
        this.current.count = 1;
    }

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
