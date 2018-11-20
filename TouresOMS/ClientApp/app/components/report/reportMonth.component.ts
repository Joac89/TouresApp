import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'report',
    templateUrl: './reportMonth.component.html',
    styleUrls: ['./reportMonth.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class reportMonthComponent {
    search: any = {};
    path: string = "";  
    aux: any;
    showItems: any[] = [];
    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        this.getReport();
        this.route.params.subscribe(params => {
            this.search.data = [];
            
        }); 
    }
    get form() { return this.reportForm.controls; }
    getReport() {
        this.loaderService.start();
        this.showItems = [];
        var tipo = 5;     
        this.http.get(this.path + "api/report/get/month/" + tipo.toString()).map(response => response.json()).subscribe(result => {           
            this.aux = result.data;
            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
            });
    }

    searchForm = new FormGroup({
       
        dateSearch: new FormControl(''),
    });

    reportForm = new FormGroup({

    });



    error: any = { statusCode: 200 };

    showOrderItems(month: string) {
        var p_month = month;

        this.loaderService.start();

        this.http.get(this.path + "api/report/get/monthDetail/" + p_month.toString()).map(response => response.json()).subscribe(result2 => {
            this.showItems = result2.data;
            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });
    }
}
