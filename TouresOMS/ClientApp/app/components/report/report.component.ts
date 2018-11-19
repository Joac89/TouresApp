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
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class reportComponent {
    search: any = {};
    typeSearch: number = 0;
    current: any = {};
    pag: number = 0;
    endPage: boolean = false;
    path: string = "";  
    aux: any;
    aux2: any;
    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        this.route.params.subscribe(params => {
            this.search.data = [];
            
        }); 
    }
    get form() { return this.reportForm.controls; }
    getReport() {
        this.loaderService.start();
        var text = this.reportForm.value.textSearch;
        var date1 = this.reportForm.value.fechaIni;
        var date2 = this.reportForm.value.fechaFin;
        var tipo = 0;
        if (text == "Ranking Ordenes Abiertas") {
            tipo = 1;
        }
        else if (text == "Ranking Cerradas") {
            tipo = 2;
        }

        this.pag += 1;
            
        this.http.get(this.path + "api/report/get/" + tipo.toString() + "/" + date1 + "/" + date2).map(response => response.json()).subscribe(result => {           
            this.aux = result;
            if (result.data.length == 0 || result.data.length < 4) this.endPage = true;
            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
            });
        //this.textSearch = atob(this.textSearch);
    }

    searchForm = new FormGroup({
       
        dateSearch: new FormControl(''),
    });

    reportForm = new FormGroup({
        textSearch: new FormControl(''),
        fechaIni: new FormControl(''),
        fechaFin: new FormControl(''),
    });



    error: any = { statusCode: 200 };

   
}
