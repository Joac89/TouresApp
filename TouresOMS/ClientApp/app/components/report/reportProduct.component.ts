import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/map';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'product',
    templateUrl: './reportProduct.component.html',
    styleUrls: ['./reportProduct.component.css', '../../style/general.css'],
    providers: [StoreService]
})
export class reportProductComponent {
    search: any = {};
    path: string = "";  
    aux: any[] = [];
    product: any = {};
    date1: string = "";
    date2: string = "";
    constructor(@Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService) {
        this.path = baseUrl;
        this.route.params.subscribe(params => {
            this.search.data = [];
            
        }); 
    }
    get form() { return this.reportForm.controls; }
    getReport() {
        this.loaderService.start();
        var tipo = 4;
        this.date1 = this.reportForm.value.fechaIni;
        this.date2 = this.reportForm.value.fechaFin;    
        this.http.get(this.path + "api/report/get/product/" + tipo.toString() + "/" + this.date1 + "/" + this.date2).map(response => response.json()).subscribe(result => {           
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
        textNombreProduct: new FormControl(''),
        textEspectaculo: new FormControl(''),
        textPrecioCiudad: new FormControl(''),
        textPrecioProducto: new FormControl(''),
        textPrecioHospedaje: new FormControl(''),
        textPrecioTransporte: new FormControl(''),
        textPrecioEspectaculo: new FormControl(''),
        fechaIni: new FormControl(''),
        fechaFin: new FormControl(''),
    });



    error: any = { statusCode: 200 };

    showOrderItems(proid: string) {
        var p_proid = btoa(proid);

        this.loaderService.start();
        
        this.http.get(this.path + "api/product/search/" + p_proid + "/2/0").map(response => response.json()).subscribe(result2 => {
            this.product = result2.data[0];

            //this.product.fechaEspectaculo = this.transformDate(this.product.fechaEspectaculo);
            //this.product.fechaSalida = this.transformDate(this.product.fechaSalida);
            //this.product.fechaLlegada = this.transformDate(this.product.fechaLlegada);

            console.log(this.product);

            //for (var i = 0; i < this.aux.data.length; ++i) {
            //    this.search.data.push(this.aux.data[i]);
            //}
            this.loaderService.end();
        }, error => {
            this.loaderService.end();
            console.error(error);
        });
    }
}
