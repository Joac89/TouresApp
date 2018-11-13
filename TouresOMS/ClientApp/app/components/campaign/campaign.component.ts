import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import { CheckControl } from '../../models/check.control';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { isPlatformBrowser, DatePipe } from '@angular/common';
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
    Campaign: any = {};
    textSearch: string = "";
    typeSearch: number = 0;
    current: any = {};
    pag: number = 0;
    endPage: boolean = false;
    path: string = "";

    inputFile: any;
    imageSrc = '';  

    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        this.route.params.subscribe(params => {
            this.search.data = [];
            this.getCampaign();
        }); 
    }

    getCampaign() {
        this.loaderService.start();
        
        this.pag += 1;
       
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

    update() {
        var carts = this.storeService.getItemsInCart();
        if (this.search.data) {
            for (var i = 0; i < this.search.data.length; ++i) {
                var find = carts.find(x => x.id == this.search.data[i].id);
                if (find) {
                    this.search.data[i].inCart = true;
                    this.search.data[i].countCart = find.count;
                }
            }
        }
    }

    check = new CheckControl(1, "Sin filtro");

    searchForm = new FormGroup({
        textSearch: new FormControl(''),
        dateSearch: new FormControl(''),
        checkSearch: new FormControl(''),
    });

    campaingForm = new FormGroup({
        textNombre: new FormControl(''),
        fechaIni: new FormControl(''),
        fechaFin: new FormControl(''),
        imageUrl: new FormControl(''),
    });

    error: any = { statusCode: 200 };

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

    get form() { return this.campaingForm.controls; }

    sendProduct() {

        this.loaderService.start();

        var json = {
            Name: this.campaingForm.value.textNombre,
            StartDate: this.campaingForm.value.fechaIni,
            EndDate: this.campaingForm.value.fechaFin,
            Image: this.imageSrc,
            Id: 0
        }

        if (this.Campaign.id != null) {

            json.Id = this.Campaign.id;

            console.log(this.Campaign);
            this.http.put(this.path + "api/campaign/update", json).map(response => response.json()).subscribe(result => {
                this.loaderService.end();
            }, error => {
                this.loaderService.end();
                this.error = error;

                console.error(error);
            });

        }
        else {

            this.http.post(this.path + "api/campaign/create", json).map(response => response.json()).subscribe(result => {
                this.loaderService.end();
            }, error => {
                this.loaderService.end();
                this.error = error;

                console.error(error);
            });
        }
    }
    
    changeFilter(id: number, text: string) {
        this.check.id = id;
        this.check.text = text;
    }

    deletecampaign(id: number) {
        this.loaderService.start();

        this.http.delete(this.path + "api/campaign/delete/" + id).map(response => response.json()).subscribe(result => {

            // if (result.code == 200) 
            //this.sendSearch();

            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });

    }

    handleInputChange(e: any) {
        const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
        const pattern = /image-*/;
        const reader = new FileReader();
        if (!file.type.match(pattern)) {
            alert('invalid format');
            return;
        }
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e: any) {
        const reader = e.target;
        this.imageSrc = reader.result;
    }
}
