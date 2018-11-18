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
    templateUrl: './reportCliente.component.html',
    styleUrls: ['./reportCliente.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class reportClienteComponent {
    search: any = {};
    path: string = "";  
    date1: string = "";
    date2: string = "";
    aux: any;
    showItems: any[] = [];
    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        this.route.params.subscribe(params => {
            this.search.data = [];
            
        }); 
    }
    get form() { return this.reportForm.controls; }
    getReport() {
        this.loaderService.start();
        this.showItems = [];
        //var text = this.reportForm.value.textSearch;
        this.date1 = this.reportForm.value.fechaIni;
        this.date2 = this.reportForm.value.fechaFin;
        var tipo = 3;
        //if (text == "Ranking Clientes") {
        //    tipo = 3;
        //}
        //else if (text == "Ranking Productos") {
        //    tipo = 4;
        //}
            
        this.http.get(this.path + "api/report/get/cliente/" + tipo.toString() + "/" + this.date1 + "/" + this.date2).map(response => response.json()).subscribe(result => {           
            this.aux = result;
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
        //textSearch: new FormControl(''),
        fechaIni: new FormControl(''),
        fechaFin: new FormControl(''),
    });



    error: any = { statusCode: 200 };

    showOrderItems(custid: number) {
        var p_cusid = custid;

        this.loaderService.start();

        this.http.get(this.path + "api/report/get/clienteRanking/" + p_cusid.toString()+ "/" + this.date1 + "/" + this.date2).map(response => response.json()).subscribe(result2 => {
            this.showItems = result2;
            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });
    }
}
