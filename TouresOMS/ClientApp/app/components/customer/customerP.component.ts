import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { StoreService } from '../../services/store.service';
import { LoaderService } from '../../services/loader.service';
import { CheckControl } from '../../models/check.control';
import { Product } from '../../models/product.model';
import { City } from '../../models/city.model';
import { Country } from '../../models/country.model';
import { TypeSpect } from '../../models/typeSpect.model';
import { TypeTrans } from '../../models/typeTrans.model';
import { TypeHospedaje } from '../../models/typeHospedaje.model';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/map';
import { forEach } from '@angular/router/src/utils/collection';
import { isPlatformBrowser, DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
    selector: 'customerP',
    templateUrl: './CustomerP.component.html',
    styleUrls: ['./CustomerP.component.css', '../../style/general.css'],
    providers: [AuthService, StoreService, DatePipe]
    
})
export class CustomerPComponent {
    search: any = {};
    aux: any = {};
    product: any = {};
    textSearch: string = "";
    typeSearch: number = 0;
    current: any = {};
    pag: number = 0;
    endPage: boolean = false;
    path: string = "";

    inputFile: any;
    imageSrc = '';  

    cardtype: string = "";    
    saved: boolean = false;
    typepsw: string = "password";
    error: any = { statusCode: 200 };
    newuser: string = btoa("undefined");

    private first: string = "";
    private last: string = "";
    private franchise: number = 0;

    id: string = "";
    user: any = {};
    update: boolean = false;
    authorize: boolean = false;

    citys: City[] = [
        { id: 1, name: 'Bogota' },
        { id: 2, name: 'Medellin' },
        { id: 3, name: 'Barranquilla' },
        { id: 4, name: 'Cali' },
        { id: 5, name: 'Madrid' },
        { id: 6, name: 'Nueva York' },
        { id: 7, name: 'Paris' },
        { id: 11027, name: 'Berlin' }
    ];

    country: Country[] = [
        { id: 'Colombia', name: 'Colombia' },
        { id: 'España', name: 'España' },
        { id: 'USA', name: 'USA' },
        { id: 'Francia', name: 'Francia' },
        { id: 'Alemania', name: 'Alemania' }
    ];

    typespect: TypeSpect[] = [
        { id: 1, name: 'Nacional' },
        { id: 14, name: 'Internacional' },        
    ];

    typetrans: TypeTrans[] = [
        { id: 1, name: 'Aereo' },
        { id: 14, name: 'Terrestre' },
    ];

    typehospedaje: TypeHospedaje[] = [
        { id: 1, name: 'Nacional' },
        { id: 14, name: 'Internacional' },
    ];


    constructor(private datePipe: DatePipe, @Inject('BASE_URL') baseUrl: string, private route: ActivatedRoute, private router: Router, private http: Http, private storeService: StoreService, private loaderService: LoaderService, private commonService: CommonService) {
        this.path = baseUrl;

        this.route.params.subscribe(params => {
            this.textSearch = params['search'];
            this.typeSearch = params['type'];
            this.search.data = [];

            if (this.textSearch) this.getSearch();
        });

    }
        
    transformDate(date: string) {
        return this.datePipe.transform(new Date(date), 'yyyy-MM-dd');
    }

    getSearch(inner: boolean = false) {
        this.loaderService.start();
        this.pag += 1;

        if (inner && this.pag > 1) {
            this.textSearch = btoa(this.textSearch);
        } else {
            this.pag = 1;
            this.endPage = false;
        }

        this.http.get(this.path + "api/product/search/" + this.textSearch + "/" + this.typeSearch + "/" + this.pag).map(response => response.json()).subscribe(result => {
            this.aux = result;
            this.product = result.data[0];

            this.product.fechaEspectaculo = this.transformDate(this.product.fechaEspectaculo);
            this.product.fechaSalida = this.transformDate(this.product.fechaSalida);
            this.product.fechaLlegada = this.transformDate(this.product.fechaLlegada);

            console.log(this.product);
                       
            if (this.aux.data.length == 0 || this.aux.data.length < 4) this.endPage = true;
                        
            for (var i = 0; i < this.aux.data.length; ++i) {
                this.search.data.push(this.aux.data[i]);
            }
                        
            this.loaderService.end();

        }, error => {
            this.loaderService.end();
            console.error(error);
        });

        this.textSearch = atob(this.textSearch);
    }

    getDetail(item: any) {
        this.current = item;
        this.current.count = 1;
    }
       
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
        this.router.navigate(["productC",
            {
                search: btoa(text),
                type: id
            }
        ]);
    }

    get form() { return this.searchForm.controls; }
    
    changeFilter(id: number, text: string) {
        this.check.id = id;
        this.check.text = text;
    }

    getUserInfo() {
        console.log("prueba");
        this.loaderService.start();

        //var token = this.tokenService.getTokenHeader();
        this.http.get(this.path + "api/Customer/get/product/" + this.searchForm.value.textSearch).map(response => response.json()).subscribe(result => {
            this.loaderService.end();
            this.user = result.data;
            
            //this.user.creditType = this.commonService.getCreditCard(this.user.creditCardType);
            //this.user.names = (this.user.fName + ' ' + this.user.lName).toUpperCase();

           
        }, error => {
            this.loaderService.end();
            console.error(error);
            });
        
    }

 }
